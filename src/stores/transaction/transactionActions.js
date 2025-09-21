// stores/transaction/transactionActions.js
import { validateTransaction } from "./transactionValidation";

import {
  getTransactionsService,
  createTransactionService,
  updateTransactionService,
  deleteTransactionService,
} from "../../services/transactionService";
import { getCategoriesService } from "../../services/categoryService";
import { getWalletsService } from "../../services/walletService";

import { trimStrings } from "../../utils/format";
import { convertFirestoreTimestamps } from "../../utils/type";
import {
  createBaseData,
  createUpdateData,
  handleStoreError,
  throwErrorWithToast,
} from "../../utils/storeHelpers";
import { showToast } from "../../utils/toast";

export const transactionActions = (set, get) => ({
  setCurrentUser: (userUid) => {
    const { currentUserUid, getTransactions, reset } = get();

    if (currentUserUid !== userUid) {
      set({ currentUserUid: userUid });

      if (userUid) {
        getTransactions(userUid);
      } else {
        reset();
      }
    }
  },

  // Load all transaction page data (including deleted references)
  getTransactions: async (userUid) => {
    if (!userUid) return;

    set({ loading: true, error: null });

    try {
      const [transactions, allCategories, allWallets] = await Promise.all([
        getTransactionsService(userUid),
        getCategoriesService(userUid, true),
        getWalletsService(userUid, true),
      ]);

      // Create lookup maps for joining data
      const categoryMap = new Map();
      const subcategoryMap = new Map();
      const walletMap = new Map(allWallets.map((w) => [w.id, w]));

      allCategories.forEach((category) => {
        categoryMap.set(category.id, category);
        if (category.subcategories) {
          category.subcategories.forEach((sub) => {
            subcategoryMap.set(sub.id, { ...sub, category });
          });
        }
      });

      // Enhance transactions with related data
      const enhancedTransactions = transactions
        .map(convertFirestoreTimestamps)
        .map((transaction) => ({
          ...transaction,
          wallet: transaction.wallet_id
            ? walletMap.get(transaction.wallet_id)
            : null,
          source_wallet: transaction.source_wallet_id
            ? walletMap.get(transaction.source_wallet_id)
            : null,
          destination_wallet: transaction.destination_wallet_id
            ? walletMap.get(transaction.destination_wallet_id)
            : null,
          category: transaction.category_id
            ? categoryMap.get(transaction.category_id)
            : null,
          subcategory: transaction.subcategory_id
            ? subcategoryMap.get(transaction.subcategory_id)
            : null,
        }));

      set({
        transactions: enhancedTransactions,
        allCategories,
        allWallets,
        loading: false,
      });
    } catch (e) {
      console.error(e);
      set({ error: "Failed to load transactions", loading: false });
    }
  },

  createTransaction: async (transactionData) => {
    const { currentUserUid } = get();

    set({ error: null });

    try {
      const trimmed = trimStrings(transactionData);

      const newTransaction = createBaseData(trimmed, currentUserUid);

      validateTransaction(newTransaction);
      await createTransactionService(newTransaction);

      await get().getTransactions(currentUserUid);

      showToast.success("Transaction created successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to create transaction", set);
      throw e;
    }
  },

  updateTransaction: async (transactionId, updatedData) => {
    const { transactions, currentUserUid } = get();

    set({ error: null });

    try {
      const existing = transactions.find((c) => c.id === transactionId);
      if (!existing) {
        throwErrorWithToast("Transaction not found");
      }

      const trimmed = trimStrings(updatedData);

      const updateData = createUpdateData(
        { ...existing, ...trimmed },
        currentUserUid,
      );

      validateTransaction(updateData);
      await updateTransactionService(transactionId, updateData);

      // Reload transactions to get enhanced data
      await get().getTransactions(currentUserUid);

      showToast.success("Transaction updated successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to update transaction", set);
      throw e;
    }
  },

  deleteTransaction: async (transactionId) => {
    const { transactions, currentUserUid } = get();

    set({ error: null });

    try {
      const existing = transactions.find((c) => c.id === transactionId);
      if (!existing) {
        throwErrorWithToast("Transaction not found");
      }

      await deleteTransactionService(transactionId);

      // Reload transactions
      await get().getTransactions(currentUserUid);

      showToast.success("Transaction deleted successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to delete transaction", set);
      throw e;
    }
  },

  reset: () => {
    set({
      transactions: [],
      allCategories: [],
      allWallets: [],
      loading: false,
      error: null,
    });
  },
});
