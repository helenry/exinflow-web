// services/transactionService.js
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  orderBy,
  runTransaction,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../api/firebase";

export const getTransactionsService = async (userUid) => {
  const q = query(
    collection(db, "transactions"),
    where("is_deleted", "==", false),
    where("user_uid", "==", userUid),
    orderBy("date", "desc"),
    orderBy("created_at", "desc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Enhanced create transaction with atomic balance update
export const createTransactionWithBalanceUpdate = async (transactionData) => {
  return await runTransaction(db, async (transaction) => {
    // STEP 1: ALL READS FIRST (before any writes)
    let sourceDoc, destDoc, walletDoc;

    if (transactionData.type === "transfer") {
      // Handle transfer between wallets
      if (
        !transactionData.source_wallet_id ||
        !transactionData.destination_wallet_id
      ) {
        throw new Error(
          "Transfer requires both source and destination wallets",
        );
      }

      const sourceWalletRef = doc(
        db,
        "wallets",
        transactionData.source_wallet_id,
      );
      const destWalletRef = doc(
        db,
        "wallets",
        transactionData.destination_wallet_id,
      );

      [sourceDoc, destDoc] = await Promise.all([
        transaction.get(sourceWalletRef),
        transaction.get(destWalletRef),
      ]);

      if (!sourceDoc.exists() || !destDoc.exists()) {
        throw new Error("One or both wallets not found");
      }

      const sourceBalance = sourceDoc.data().current_balance || 0;

      // Check if source wallet has sufficient funds
      if (sourceBalance < transactionData.amount) {
        throw new Error("Insufficient funds in source wallet");
      }
    } else {
      // Handle regular income/expense transaction
      if (!transactionData.wallet_id) {
        throw new Error("Regular transaction requires wallet_id");
      }

      const walletRef = doc(db, "wallets", transactionData.wallet_id);
      walletDoc = await transaction.get(walletRef);

      if (!walletDoc.exists()) {
        throw new Error("Wallet not found");
      }

      const currentBalance = walletDoc.data().current_balance || 0;

      // Check for sufficient funds on expenses
      if (
        transactionData.type === "expense" &&
        currentBalance < transactionData.amount
      ) {
        throw new Error("Insufficient funds");
      }
    }

    // STEP 2: ALL WRITES AFTER READS
    // Create the transaction document
    const transactionRef = doc(collection(db, "transactions"));
    transaction.set(transactionRef, transactionData);

    // Update wallet balances
    if (transactionData.type === "transfer") {
      const sourceWalletRef = doc(
        db,
        "wallets",
        transactionData.source_wallet_id,
      );
      const destWalletRef = doc(
        db,
        "wallets",
        transactionData.destination_wallet_id,
      );

      const sourceBalance = sourceDoc.data().current_balance || 0;
      const destBalance = destDoc.data().current_balance || 0;

      transaction.update(sourceWalletRef, {
        current_balance: sourceBalance - transactionData.amount,
        updated_at: new Date(),
      });

      transaction.update(destWalletRef, {
        current_balance: destBalance + transactionData.amount,
        updated_at: new Date(),
      });
    } else {
      const walletRef = doc(db, "wallets", transactionData.wallet_id);
      const currentBalance = walletDoc.data().current_balance || 0;
      const balanceChange =
        transactionData.type === "income"
          ? transactionData.amount
          : -transactionData.amount;

      transaction.update(walletRef, {
        current_balance: currentBalance + balanceChange,
        updated_at: new Date(),
      });
    }

    return transactionRef;
  });
};

// Enhanced update transaction with balance adjustment
export const updateTransactionWithBalanceUpdate = async (
  transactionId,
  oldTransactionData,
  newTransactionData,
) => {
  return await runTransaction(db, async (transaction) => {
    // STEP 1: ALL READS FIRST
    const transactionRef = doc(db, "transactions", transactionId);

    // Calculate balance changes needed
    const balanceAdjustments = calculateBalanceAdjustments(
      oldTransactionData,
      newTransactionData,
    );

    // Read all affected wallets
    const walletReads = [];
    const walletRefs = new Map();

    for (const walletId of balanceAdjustments.keys()) {
      const walletRef = doc(db, "wallets", walletId);
      walletRefs.set(walletId, walletRef);
      walletReads.push(transaction.get(walletRef));
    }

    const walletDocs = await Promise.all(walletReads);
    const walletData = new Map();

    // Process wallet documents and validate
    let index = 0;
    for (const [walletId, adjustment] of balanceAdjustments.entries()) {
      const walletDoc = walletDocs[index];

      if (!walletDoc.exists()) {
        throw new Error(`Wallet ${walletId} not found`);
      }

      const currentBalance = walletDoc.data().current_balance || 0;
      const newBalance = currentBalance + adjustment;

      // Prevent negative balances
      if (newBalance < 0) {
        throw new Error(`Insufficient funds in wallet ${walletId}`);
      }

      walletData.set(walletId, { currentBalance, newBalance, adjustment });
      index++;
    }

    // STEP 2: ALL WRITES AFTER READS
    // Update the transaction document
    transaction.update(transactionRef, newTransactionData);

    // Apply balance adjustments to affected wallets
    for (const [walletId, { newBalance }] of walletData.entries()) {
      const walletRef = walletRefs.get(walletId);
      transaction.update(walletRef, {
        current_balance: newBalance,
        updated_at: new Date(),
      });
    }

    return transactionRef;
  });
};

// Enhanced delete transaction with balance restoration
export const deleteTransactionWithBalanceUpdate = async (
  transactionId,
  transactionData,
) => {
  return await runTransaction(db, async (transaction) => {
    // STEP 1: ALL READS FIRST
    const transactionRef = doc(db, "transactions", transactionId);

    let walletDocs = [];
    let walletRefs = [];

    if (transactionData.type === "transfer") {
      const sourceWalletRef = doc(
        db,
        "wallets",
        transactionData.source_wallet_id,
      );
      const destWalletRef = doc(
        db,
        "wallets",
        transactionData.destination_wallet_id,
      );

      walletRefs = [sourceWalletRef, destWalletRef];
      walletDocs = await Promise.all([
        transaction.get(sourceWalletRef),
        transaction.get(destWalletRef),
      ]);
    } else {
      const walletRef = doc(db, "wallets", transactionData.wallet_id);
      walletRefs = [walletRef];
      walletDocs = [await transaction.get(walletRef)];
    }

    // STEP 2: ALL WRITES AFTER READS
    // Soft delete the transaction
    transaction.update(transactionRef, {
      is_deleted: true,
      updated_at: new Date(),
    });

    // Reverse the balance effects of the deleted transaction
    if (transactionData.type === "transfer") {
      const [sourceDoc, destDoc] = walletDocs;
      const [sourceWalletRef, destWalletRef] = walletRefs;

      if (sourceDoc.exists()) {
        const sourceBalance = sourceDoc.data().current_balance || 0;
        transaction.update(sourceWalletRef, {
          current_balance: sourceBalance + transactionData.amount, // Add back
          updated_at: new Date(),
        });
      }

      if (destDoc.exists()) {
        const destBalance = destDoc.data().current_balance || 0;
        transaction.update(destWalletRef, {
          current_balance: destBalance - transactionData.amount, // Remove
          updated_at: new Date(),
        });
      }
    } else {
      const [walletDoc] = walletDocs;
      const [walletRef] = walletRefs;

      if (walletDoc.exists()) {
        const currentBalance = walletDoc.data().current_balance || 0;
        const balanceRestore =
          transactionData.type === "income"
            ? -transactionData.amount // Remove the income
            : transactionData.amount; // Add back the expense

        transaction.update(walletRef, {
          current_balance: currentBalance + balanceRestore,
          updated_at: new Date(),
        });
      }
    }

    return transactionRef;
  });
};

// Helper function to calculate balance adjustments for updates
const calculateBalanceAdjustments = (oldTransaction, newTransaction) => {
  const adjustments = new Map();

  // Reverse old transaction effects
  if (oldTransaction.type === "transfer") {
    adjustments.set(
      oldTransaction.source_wallet_id,
      (adjustments.get(oldTransaction.source_wallet_id) || 0) +
        oldTransaction.amount,
    );
    adjustments.set(
      oldTransaction.destination_wallet_id,
      (adjustments.get(oldTransaction.destination_wallet_id) || 0) -
        oldTransaction.amount,
    );
  } else {
    const oldChange =
      oldTransaction.type === "income"
        ? -oldTransaction.amount
        : oldTransaction.amount;
    adjustments.set(
      oldTransaction.wallet_id,
      (adjustments.get(oldTransaction.wallet_id) || 0) + oldChange,
    );
  }

  // Apply new transaction effects
  if (newTransaction.type === "transfer") {
    adjustments.set(
      newTransaction.source_wallet_id,
      (adjustments.get(newTransaction.source_wallet_id) || 0) -
        newTransaction.amount,
    );
    adjustments.set(
      newTransaction.destination_wallet_id,
      (adjustments.get(newTransaction.destination_wallet_id) || 0) +
        newTransaction.amount,
    );
  } else {
    const newChange =
      newTransaction.type === "income"
        ? newTransaction.amount
        : -newTransaction.amount;
    adjustments.set(
      newTransaction.wallet_id,
      (adjustments.get(newTransaction.wallet_id) || 0) + newChange,
    );
  }

  return adjustments;
};

// Legacy methods for backward compatibility (will be removed)
export const createTransactionService = async (newTransaction) =>
  await addDoc(collection(db, "transactions"), newTransaction);

export const updateTransactionService = async (transactionId, updateData) =>
  await updateDoc(doc(db, "transactions", transactionId), updateData);

export const deleteTransactionService = async (transactionId) =>
  await updateDoc(doc(db, "transactions", transactionId), { is_deleted: true });
