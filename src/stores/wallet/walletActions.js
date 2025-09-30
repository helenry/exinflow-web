// stores/wallet/walletActions.js
import {
  getWalletsService,
  createWalletService,
  updateWalletService,
  deleteWalletService,
  updateWalletWithBalanceRecalculation,
} from "../../services/walletService";
import { trimStrings } from "../../utils/format";
import { convertFirestoreTimestamps } from "../../utils/type";
import { validateWallet, validateWalletUniqueness } from "./walletValidation";
import {
  createBaseData,
  createUpdateData,
  handleStoreError,
  throwErrorWithToast,
} from "../../utils/storeHelpers";
import { showToast } from "../../utils/toast";
import useTransactionStore from "../transaction/transactionStore";

export const walletActions = (set, get) => ({
  setCurrentUser: (userUid) => {
    const { currentUserUid, getWallets, reset } = get();

    if (currentUserUid !== userUid) {
      set({ currentUserUid: userUid });

      if (userUid) {
        getWallets(userUid);
      } else {
        reset();
      }
    }
  },

  getWallets: async (userUid) => {
    if (!userUid) return;

    set({ loading: true, error: null });

    try {
      const data = await getWalletsService(userUid);

      const walletList = data
        .map(convertFirestoreTimestamps)
        .filter((wallet) => {
          try {
            validateWallet(wallet);
            return true;
          } catch (e) {
            console.warn("Invalid wallet skipped:", e);
            return false;
          }
        });

      const activeWallets = walletList.filter((wallet) => !wallet.is_deleted);

      set({
        wallets: activeWallets,
        walletsWithDeleted: walletList,
        loading: false,
      });

      // Refresh transaction store if it has data and current user matches
      const transactionStore = useTransactionStore.getState();
      if (
        transactionStore.currentUserUid === userUid &&
        transactionStore.transactions.length > 0
      ) {
        transactionStore.refreshTransactionData();
      }
    } catch (e) {
      console.error(e);
      set({ error: "Failed to load wallets", loading: false });
    }
  },

  createWallet: async (walletData) => {
    const { wallets, currentUserUid } = get();

    set({ error: null });

    try {
      const trimmed = trimStrings(walletData);

      if (!validateWalletUniqueness(wallets, trimmed.name)) {
        throwErrorWithToast("Wallet name must be unique");
      }

      const newWallet = createBaseData(
        {
          ...trimmed,
          // Set current_balance equal to base_amount for new wallets (no transactions yet)
          current_balance: trimmed.base_amount || 0,
        },
        currentUserUid,
      );

      validateWallet(newWallet);
      const docRef = await createWalletService(newWallet);

      // Update local state
      set((state) => ({
        wallets: [
          ...state.wallets,
          { id: docRef.id, ...newWallet, created_at: new Date() },
        ],
        walletsWithDeleted: [
          ...state.walletsWithDeleted,
          { id: docRef.id, ...newWallet, created_at: new Date() },
        ],
      }));

      // Trigger cross-store update
      const transactionStore = useTransactionStore.getState();
      if (
        transactionStore.currentUserUid === currentUserUid &&
        transactionStore.transactions.length > 0
      ) {
        transactionStore.refreshTransactionData();
      }

      showToast.success("Wallet created successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to create wallet", set);
      throw e;
    }
  },

  updateWallet: async (walletId, updatedData) => {
    const { wallets, currentUserUid } = get();

    set({ error: null });

    try {
      const existing = wallets.find((w) => w.id === walletId);
      if (!existing) {
        throwErrorWithToast("Wallet not found");
      }

      const trimmed = trimStrings(updatedData);

      if (!validateWalletUniqueness(wallets, trimmed.name, walletId)) {
        throwErrorWithToast("Wallet name must be unique");
      }

      const { currency, ...rest } = { ...existing, ...trimmed };
      const updateData = createUpdateData(rest, currentUserUid);

      validateWallet(updateData);

      // Check if base_amount is being changed
      const isBaseAmountChanged =
        updateData.base_amount !== undefined &&
        updateData.base_amount !== existing.base_amount;

      if (isBaseAmountChanged) {
        // Use enhanced update method that recalculates current_balance
        await updateWalletWithBalanceRecalculation(
          walletId,
          updateData,
          currentUserUid,
        );

        // Reload wallets to get the updated balances
        await get().getWallets(currentUserUid);

        showToast.success("Wallet updated and balance recalculated!");
      } else {
        // Regular update without balance recalculation
        await updateWalletService(walletId, updateData);

        // Update local state
        set((state) => ({
          wallets: state.wallets.map((w) =>
            w.id === walletId
              ? { ...w, ...trimmed, updated_at: new Date() }
              : w,
          ),
          walletsWithDeleted: state.walletsWithDeleted.map((w) =>
            w.id === walletId
              ? { ...w, ...trimmed, updated_at: new Date() }
              : w,
          ),
        }));

        // Trigger cross-store update for regular updates too
        const transactionStore = useTransactionStore.getState();
        if (
          transactionStore.currentUserUid === currentUserUid &&
          transactionStore.transactions.length > 0
        ) {
          transactionStore.refreshTransactionData();
        }

        showToast.success("Wallet updated successfully!");
      }
    } catch (e) {
      handleStoreError(e, "Failed to update wallet", set);
      throw e;
    }
  },

  deleteWallet: async (walletId) => {
    const { wallets, currentUserUid } = get();

    set({ error: null });

    try {
      const existing = wallets.find((w) => w.id === walletId);
      if (!existing) {
        throwErrorWithToast("Wallet not found");
      }

      // TODO: Add validation to prevent deletion of wallets with existing transactions
      // This should be implemented based on your business logic

      await deleteWalletService(walletId);

      set((state) => ({
        wallets: state.wallets.filter((w) => w.id !== walletId),
      }));

      // Reload wallets to update walletsWithDeleted (showing soft deleted)
      await get().getWallets(currentUserUid);

      showToast.success("Wallet deleted successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to delete wallet", set);
      throw e;
    }
  },

  reset: () => {
    set({
      wallets: [],
      walletsWithDeleted: [],
      loading: false,
      error: null,
    });
  },
});
