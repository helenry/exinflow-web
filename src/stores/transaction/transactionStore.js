// stores/transaction/transactionStore.js
import { create } from "zustand";
import { transactionActions } from "./transactionActions";

const useTransactionStore = create((set, get) => ({
  // State
  transactions: [],
  loading: false,
  error: null,
  currentUserUid: null,

  // Actions
  ...transactionActions(set, get),
}));

export default useTransactionStore;
