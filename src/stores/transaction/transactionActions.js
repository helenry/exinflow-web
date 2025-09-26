// stores/transaction/transactionActions.js
import { validateTransaction } from "./transactionValidation";

import {
  getTransactionsService,
  updateTransactionWithBalanceUpdate,
  deleteTransactionWithBalanceUpdate,
  createTransactionWithBalanceUpdate,
} from "../../services/transactionService";

import { trimStrings } from "../../utils/format";
import { convertFirestoreTimestamps } from "../../utils/type";
import {
  createBaseData,
  createUpdateData,
  handleStoreError,
  throwErrorWithToast,
} from "../../utils/storeHelpers";
import { showToast } from "../../utils/toast";
import useWalletStore from "../wallet/walletStore";
import useCategoryStore from "../category/categoryStore";

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

  // Enhanced method to refresh transaction data with latest wallet/category info
  refreshTransactionData: async () => {
    const { currentUserUid, transactions } = get();
    if (!currentUserUid || !transactions.length) return;

    try {
      // Get fresh wallet and category data
      const walletsWithDeleted = useWalletStore.getState().walletsWithDeleted;
      const categoriesWithDeleted =
        useCategoryStore.getState().categoriesWithDeleted;

      // Create lookup maps for joining data
      const categoryMap = new Map();
      const subcategoryMap = new Map();
      const walletMap = new Map(walletsWithDeleted.map((w) => [w.id, w]));

      categoriesWithDeleted.forEach((category) => {
        categoryMap.set(category.id, category);
        if (category.subcategories) {
          category.subcategories.forEach((sub) => {
            subcategoryMap.set(sub.id, { ...sub, category });
          });
        }
      });

      // Re-enhance transactions with fresh data
      const refreshedTransactions = transactions.map((transaction) => ({
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

      set({ transactions: refreshedTransactions });
    } catch (error) {
      console.error(
        "[transactionStore] Error refreshing transaction data:",
        error,
      );
    }
  },

  // Load all transaction page data (including deleted references)
  getTransactions: async (userUid) => {
    if (!userUid) return;

    set({ loading: true, error: null });

    try {
      // Ensure wallet and category stores have data
      let walletsWithDeleted = useWalletStore.getState().walletsWithDeleted;
      if (!walletsWithDeleted.length) {
        await useWalletStore.getState().getWallets(userUid);
        walletsWithDeleted = useWalletStore.getState().walletsWithDeleted;
      }

      let categoriesWithDeleted =
        useCategoryStore.getState().categoriesWithDeleted;
      if (!categoriesWithDeleted.length) {
        await useCategoryStore.getState().getCategories(userUid);
        categoriesWithDeleted =
          useCategoryStore.getState().categoriesWithDeleted;
      }

      const [transactions] = await Promise.all([
        getTransactionsService(userUid),
      ]);

      // Create lookup maps for joining data
      const categoryMap = new Map();
      const subcategoryMap = new Map();
      const walletMap = new Map(walletsWithDeleted.map((w) => [w.id, w]));

      categoriesWithDeleted.forEach((category) => {
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

      // Use atomic transaction creation with balance update
      await createTransactionWithBalanceUpdate(newTransaction);

      // Refresh wallet store to get updated balances
      await useWalletStore.getState().getWallets(currentUserUid);

      // Reload transaction data with fresh wallet references
      await get().getTransactions(currentUserUid);

      showToast.success("Transaction created successfully!");
    } catch (e) {
      // Handle specific error cases
      if (e.message.includes("Insufficient funds")) {
        showToast.error("Insufficient funds in wallet");
      } else if (e.message.includes("Wallet not found")) {
        showToast.error("Selected wallet not found");
      } else {
        handleStoreError(e, "Failed to create transaction", set);
      }
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

      const {
        source_wallet,
        destination_wallet,
        category,
        subcategory,
        wallet,
        ...rest
      } = { ...existing, ...trimmed };

      const updateData = createUpdateData(rest, currentUserUid);

      validateTransaction(updateData);

      // Prepare old transaction data for balance calculation
      const oldTransactionData = {
        wallet_id: existing.wallet_id,
        source_wallet_id: existing.source_wallet_id,
        destination_wallet_id: existing.destination_wallet_id,
        amount: existing.amount,
        type: existing.type,
      };

      // Use atomic transaction update with balance adjustment
      await updateTransactionWithBalanceUpdate(
        transactionId,
        oldTransactionData,
        updateData,
      );

      // Refresh wallet store to get updated balances
      await useWalletStore.getState().getWallets(currentUserUid);

      // Reload transactions to get enhanced data with updated balances
      await get().getTransactions(currentUserUid);

      showToast.success("Transaction updated successfully!");
    } catch (e) {
      if (e.message.includes("Insufficient funds")) {
        showToast.error("Insufficient funds for this transaction update");
      } else {
        handleStoreError(e, "Failed to update transaction", set);
      }
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

      // Prepare transaction data for balance restoration
      const transactionData = {
        wallet_id: existing.wallet_id,
        source_wallet_id: existing.source_wallet_id,
        destination_wallet_id: existing.destination_wallet_id,
        amount: existing.amount,
        type: existing.type,
      };

      // Use atomic transaction deletion with balance restoration
      await deleteTransactionWithBalanceUpdate(transactionId, transactionData);

      // Refresh wallet store to get updated balances
      await useWalletStore.getState().getWallets(currentUserUid);

      // Reload transactions to reflect updated balances
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
      loading: false,
      error: null,
    });
  },
});
