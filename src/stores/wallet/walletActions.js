// stores/wallet/walletActions.js
import {
  getWalletsService,
  createWalletService,
  updateWalletService,
  deleteWalletService,
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

      set({ wallets: walletList, loading: false });
    } catch (e) {
      console.error(e);
      set({ error: "Failed to load wallets", loading: false });
    }
  },

  createWallet: async (walletData) => {
  const { wallets, currentUserUid } = get();

  console.log("[createWallet] Starting wallet creation");
  console.log("[createWallet] Current user UID:", currentUserUid);
  console.log("[createWallet] Existing wallets:", wallets);
  console.log("[createWallet] Incoming walletData:", walletData);

  set({ error: null });

  try {
    const trimmed = trimStrings(walletData);
    console.log("[createWallet] Trimmed walletData:", trimmed);

    if (!validateWalletUniqueness(wallets, trimmed.name)) {
      console.error("[createWallet] Wallet name not unique:", trimmed.name);
      throwErrorWithToast("Wallet name must be unique");
    }

      const newWallet = createBaseData(
        {
          ...trimmed,
          amount: 0,
        },
        currentUserUid,
      );

      validateWallet(newWallet);
      const docRef = await createWalletService(newWallet);

      set((state) => ({
        wallets: [
          ...state.wallets,
          { id: docRef.id, ...newWallet, created_at: new Date() },
        ],
      }));

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

      const updateData = createUpdateData(
        { ...existing, ...trimmed },
        currentUserUid,
      );

      validateWallet(updateData);
      await updateWalletService(walletId, updateData);

      set((state) => ({
        wallets: state.wallets.map((w) =>
          w.id === walletId ? { ...w, ...trimmed, updated_at: new Date() } : w,
        ),
      }));

      showToast.success("Wallet updated successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to update wallet", set);
      throw e;
    }
  },

  deleteWallet: async (walletId) => {
    const { wallets } = get();

    set({ error: null });

    try {
      const existing = wallets.find((w) => w.id === walletId);
      if (!existing) {
        throwErrorWithToast("Wallet not found");
      }

      await deleteWalletService(walletId);

      set((state) => ({
        wallets: state.wallets.filter((w) => w.id !== walletId),
      }));
      showToast.success("Wallet deleted successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to delete wallet", set);
      throw e;
    }
  },

  reset: () => {
    set({
      wallets: [],
      loading: false,
      error: null,
    });
  },
});
