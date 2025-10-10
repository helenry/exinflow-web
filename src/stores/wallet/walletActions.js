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
  handleStoreError,
  throwErrorWithToast,
} from "../../utils/store/storeError";
import { createBaseData, createUpdateData } from "../../utils/store/storeData";
import { showToast } from "../../utils/toast";
import useTransactionStore from "../transaction/transactionStore";
import useCurrencyStore from "../currency/currencyStore";
import authStore from "../../stores/auth/authStore";

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

      // Initialize currency rates after wallets are loaded
      const userConfig = authStore.getState().userConfig;
      if (userConfig?.main_currency_code) {
        const currencyStore = useCurrencyStore.getState();
        await currencyStore.initializeRates(
          userUid,
          activeWallets,
          userConfig.main_currency_code
        );
      }

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
        currentUserUid
      );

      validateWallet(newWallet);
      const docRef = await createWalletService(newWallet);

      const createdWallet = {
        id: docRef.id,
        ...newWallet,
        created_at: new Date(),
      };

      // Update local state
      set((state) => ({
        wallets: [...state.wallets, createdWallet],
        walletsWithDeleted: [...state.walletsWithDeleted, createdWallet],
      }));

      // Handle currency rate fetching for new wallet
      const userConfig = authStore.getState().userConfig;
      if (userConfig?.main_currency_code) {
        const newCurrency = createdWallet.currency_code;
        const mainCurrency = userConfig.main_currency_code;

        // Only fetch rates if:
        // 1. New currency is different from main currency
        // 2. New currency is not already used by other wallets
        if (newCurrency !== mainCurrency) {
          const existingCurrencies = wallets
            .filter((w) => w.currency_code !== mainCurrency)
            .map((w) => w.currency_code);

          if (!existingCurrencies.includes(newCurrency)) {
            // This is a new currency that requires rates
            const currencyStore = useCurrencyStore.getState();
            await currencyStore.handleNewWallet(
              currentUserUid,
              wallets,
              createdWallet,
              mainCurrency
            );
          }
        }
      }

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

      const { id, currency, ...rest } = { ...existing, ...trimmed };
      const updateData = createUpdateData(rest, currentUserUid);

      validateWallet(updateData);

      // Store old wallet for currency comparison
      const oldWallet = { ...existing };

      // Check if base_amount is being changed
      const isBaseAmountChanged =
        updateData.base_amount !== undefined &&
        updateData.base_amount !== existing.base_amount;

      if (isBaseAmountChanged) {
        // Use enhanced update method that recalculates current_balance
        await updateWalletService(walletId, updateData, true);
        // Reload wallets to get the updated balances
        await get().getWallets(currentUserUid);
        showToast.success("Wallet updated and balance recalculated!");
      } else {
        // Regular update without balance recalculation
        await updateWalletService(walletId, updateData);

        const updatedWallet = {
          ...existing,
          ...trimmed,
          updated_at: new Date(),
        };

        // Update local state
        set((state) => ({
          wallets: state.wallets.map((w) =>
            w.id === walletId ? updatedWallet : w
          ),
          walletsWithDeleted: state.walletsWithDeleted.map((w) =>
            w.id === walletId ? updatedWallet : w
          ),
        }));

        // Handle currency rate fetching for wallet update
        const userConfig = authStore.getState().userConfig;
        if (userConfig?.main_currency_code) {
          const oldCurrency = oldWallet.currency_code;
          const newCurrency = updatedWallet.currency_code;
          const mainCurrency = userConfig.main_currency_code;

          // Only fetch rates if currency changed AND:
          // 1. New currency is different from main currency
          // 2. New currency is not already used by other wallets
          if (oldCurrency !== newCurrency && newCurrency !== mainCurrency) {
            const otherWallets = wallets.filter((w) => w.id !== walletId);
            const existingCurrencies = otherWallets
              .filter((w) => w.currency_code !== mainCurrency)
              .map((w) => w.currency_code);

            if (!existingCurrencies.includes(newCurrency)) {
              // This is a new currency that requires rates
              const updatedWallets = wallets.map((w) =>
                w.id === walletId ? updatedWallet : w
              );
              const currencyStore = useCurrencyStore.getState();
              await currencyStore.handleWalletUpdate(
                currentUserUid,
                updatedWallets,
                oldWallet,
                updatedWallet,
                mainCurrency
              );
            }
          }
        }

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

      // Note: No need to refetch currency rates when deleting wallet
      // The total balance calculation will automatically handle missing wallets

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
