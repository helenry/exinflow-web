// stores/transaction/transactionStore.js
import { create } from "zustand";
import { transactionActions } from "./transactionActions";

const useTransactionStore = create((set, get) => ({
  // State
  transactions: [],
  allCategories: [], // All categories including deleted ones
  allWallets: [], // All wallets including deleted ones
  loading: false,
  error: null,
  currentUserUid: null,

  // Actions
  ...transactionActions(set, get),
}));

export default useTransactionStore;
