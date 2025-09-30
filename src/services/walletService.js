// services/walletService.js
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  orderBy,
  runTransaction,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { DEFAULT_CREATOR, DEFAULT_WALLET } from "@/constants";
import { DEFAULT_CURRENCY } from "../constants";

export const getWalletsService = async (userUid) => {
  const q = query(
    collection(db, "wallets"),
    where("user_uid", "==", userUid),
    orderBy("created_at", "asc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createWalletService = async (newWallet) =>
  await addDoc(collection(db, "wallets"), newWallet);

export const updateWalletService = async (
  walletId,
  updateData,
  recalculateBalance = false,
) => {
  // If balance recalculation is not needed, use simple update
  if (!recalculateBalance) {
    return await updateDoc(doc(db, "wallets", walletId), {
      ...updateData,
      updated_at: new Date(),
    });
  }

  // Use transaction for balance recalculation
  return await runTransaction(db, async (transaction) => {
    const walletRef = doc(db, "wallets", walletId);
    const walletDoc = await transaction.get(walletRef);

    if (!walletDoc.exists()) {
      throw new Error("Wallet not found");
    }

    const currentWallet = walletDoc.data();

    // Check if base_amount is being changed
    const isBaseAmountChanged =
      updateData.base_amount !== undefined &&
      updateData.base_amount !== currentWallet.base_amount;

    if (isBaseAmountChanged) {
      // Efficiently adjust current_balance by the difference in base_amount
      // Formula: new_current_balance = old_current_balance + (new_base_amount - old_base_amount)
      const baseAmountDifference =
        updateData.base_amount - (currentWallet.base_amount || 0);
      const oldCurrentBalance = currentWallet.current_balance || 0;

      updateData.current_balance = oldCurrentBalance + baseAmountDifference;

      console.log(
        `[updateWalletService] Base amount: ${currentWallet.base_amount} → ${updateData.base_amount}`,
      );
      console.log(
        `[updateWalletService] Current balance: ${oldCurrentBalance} → ${updateData.current_balance}`,
      );
      console.log(
        `[updateWalletService] Difference applied: ${baseAmountDifference}`,
      );
    }

    // Update wallet with new data
    transaction.update(walletRef, {
      ...updateData,
      updated_at: new Date(),
    });

    return walletRef;
  });
};

// Helper function to calculate transaction sum for a wallet
const calculateWalletTransactionSum = async (
  walletId,
  userUid,
  firestoreTransaction = null,
) => {
  const transactionsQuery = query(
    collection(db, "transactions"),
    where("user_uid", "==", userUid),
    where("is_deleted", "==", false),
  );

  let snapshot;
  if (firestoreTransaction) {
    // If called within a Firestore transaction, we can't use the transaction to query
    // So we'll get fresh data (this is a limitation of Firestore transactions)
    snapshot = await getDocs(transactionsQuery);
  } else {
    snapshot = await getDocs(transactionsQuery);
  }

  const transactions = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return transactions.reduce((sum, t) => {
    // Regular transactions
    if (t.wallet_id === walletId) {
      return sum + (t.type === "income" ? t.amount : -t.amount);
    }

    // Transfer transactions
    if (t.type === "transfer") {
      if (t.source_wallet_id === walletId) {
        return sum - t.amount; // Money going out
      }
      if (t.destination_wallet_id === walletId) {
        return sum + t.amount; // Money coming in
      }
    }

    return sum;
  }, 0);
};

// Full balance recalculation utility (for data repair/validation)
export const recalculateWalletBalanceFromTransactions = async (
  walletId,
  userUid,
) => {
  return await runTransaction(db, async (transaction) => {
    const walletRef = doc(db, "wallets", walletId);
    const walletDoc = await transaction.get(walletRef);

    if (!walletDoc.exists()) {
      throw new Error("Wallet not found");
    }

    const wallet = walletDoc.data();
    const transactionSum = await calculateWalletTransactionSum(
      walletId,
      userUid,
    );
    const correctBalance = wallet.base_amount + transactionSum;

    transaction.update(walletRef, {
      current_balance: correctBalance,
      updated_at: new Date(),
      last_balance_check: new Date(),
    });

    return correctBalance;
  });
};

export const deleteWalletService = async (walletId) =>
  await updateDoc(doc(db, "wallets", walletId), { is_deleted: true });

export const createStarterWalletService = async (userId) => {
  const walletsRef = collection(db, "wallets");
  const q = query(
    walletsRef,
    where("user_uid", "==", userId),
    where("is_deleted", "==", false),
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    const defaultWalletData = {
      ...DEFAULT_WALLET,
      currency_code: DEFAULT_CURRENCY,
      user_uid: userId,
      created_at: serverTimestamp(),
      created_by: DEFAULT_CREATOR,
      updated_at: null,
      updated_by: null,
      is_deleted: false,
    };

    await createWalletService(defaultWalletData);
    console.log("Default wallet created");
  } else {
    console.log("Wallet already exists");
  }
};
