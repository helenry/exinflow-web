// stores/wallet/walletStore.js
import { create } from "zustand";
import { walletActions } from "./walletActions";

const useWalletStore = create((set, get) => ({
  // State
  wallets: [],
  walletsWithDeleted: [],
  loading: false,
  error: null,
  currentUserUid: null,

  // Actions
  ...walletActions(set, get),
}));

export default useWalletStore;
