// stores/currency/currencyActions.js
import { currencyService } from "../../services/currencyService";
import { showToast } from "../../utils/toast";
import { handleStoreError } from "../../utils/store/storeError";

export const currencyActions = (set, get) => ({
  // Setters
  setRates: (ratesData) => {
    set({
      rates: ratesData,
      lastFetchTime: Date.now(),
      error: null,
    });
  },

  setLoading: (loading) => {
    set({ loading });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  clearRates: () => {
    set({
      rates: null,
      lastFetchTime: null,
      error: null,
    });
  },

  // Getters
  getRates: () => {
    return get().rates;
  },

  getRate: (currencyCode) => {
    const { rates } = get();
    return rates?.rates?.[currencyCode] || null;
  },

  getBaseCurrency: () => {
    const { rates } = get();
    return rates?.base_currency || null;
  },

  isLoading: () => {
    return get().loading;
  },

  hasError: () => {
    return get().error !== null;
  },

  getError: () => {
    return get().error;
  },

  hasRates: () => {
    return get().rates !== null;
  },

  isRatesFromCache: () => {
    const { rates } = get();
    return rates?.from_cache === true;
  },

  getLastUpdated: () => {
    const { rates } = get();
    return rates?.last_updated_at || null;
  },

  getLastFetchTime: () => {
    return get().lastFetchTime;
  },

  isStale: () => {
    const { rates } = get();
    if (!rates?.last_updated_at) {
      return true;
    }

    const lastUpdated = new Date(rates.last_updated_at);
    const now = new Date();
    const ageInHours = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
    
    return ageInHours >= 24;
  },

  hasAllCurrencies: (requiredCurrencies) => {
    const { rates } = get();
    if (!rates?.rates) {
      return false;
    }

    const availableCurrencies = Object.keys(rates.rates);
    return requiredCurrencies.every((currency) =>
      availableCurrencies.includes(currency)
    );
  },

  getMissingCurrencies: (requiredCurrencies) => {
    const { rates } = get();
    if (!rates?.rates) {
      return requiredCurrencies;
    }

    const availableCurrencies = Object.keys(rates.rates);
    return requiredCurrencies.filter(
      (currency) => !availableCurrencies.includes(currency)
    );
  },

  // Utility Methods
  getUniqueCurrencies: (wallets, mainCurrency) => {
    const uniqueCurrencies = [
      ...new Set(
        wallets
          .map((wallet) => wallet.currency_code)
          .filter((currency) => currency && currency !== mainCurrency)
      ),
    ];

    return uniqueCurrencies;
  },

  shouldFetchRates: (wallets, mainCurrency) => {
    const { getUniqueCurrencies } = get();
    const uniqueCurrencies = getUniqueCurrencies(wallets, mainCurrency);
    return uniqueCurrencies.length > 0;
  },

  needsRefresh: () => {
    const { rates } = get();

    if (!rates || !rates.last_updated_at) {
      return true;
    }

    const lastUpdated = new Date(rates.last_updated_at);
    const now = new Date();
    const ageInHours = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);

    // Refresh if older than 24 hours
    return ageInHours >= 24;
  },

  isNewCurrencyRequiringRates: (newCurrency, mainCurrency) => {
    if (newCurrency === mainCurrency) {
      return false;
    }

    const { rates } = get();
    const currentRates = rates?.rates || {};

    return !currentRates.hasOwnProperty(newCurrency);
  },

  // Main Actions
  fetchRates: async (userId, wallets, mainCurrency, forceRefresh = false) => {
    const { shouldFetchRates, getUniqueCurrencies } = get();

    set({ loading: true, error: null });

    try {
      // Check if we need to fetch rates
      if (!shouldFetchRates(wallets, mainCurrency)) {
        set({
          rates: {
            base_currency: mainCurrency,
            rates: {},
            last_updated_at: new Date().toISOString(),
            from_cache: true,
          },
          lastFetchTime: Date.now(),
          loading: false,
        });
        return;
      }

      const uniqueCurrencies = getUniqueCurrencies(wallets, mainCurrency);

      const ratesData = await currencyService.getRates(
        userId,
        mainCurrency,
        uniqueCurrencies,
        forceRefresh
      );

      set({
        rates: ratesData,
        lastFetchTime: Date.now(),
        loading: false,
        error: null,
      });

      if (!forceRefresh && !ratesData.from_cache) {
        showToast.success("Exchange rates updated successfully");
      } else if (forceRefresh) {
        showToast.success("Exchange rates refreshed");
      }
    } catch (e) {
      const errorMessage = forceRefresh
        ? "Failed to refresh exchange rates"
        : "Failed to fetch exchange rates";
      
      handleStoreError(e, errorMessage, set);
      throw e;
    }
  },

  refreshRates: async (userId, wallets, mainCurrency) => {
    const { fetchRates } = get();
    await fetchRates(userId, wallets, mainCurrency, true);
  },

  initializeRates: async (userId, wallets, mainCurrency) => {
    const { shouldFetchRates, fetchRates } = get();
    
    if (shouldFetchRates(wallets, mainCurrency)) {
      await fetchRates(userId, wallets, mainCurrency, false);
    }
  },

  handleNewWallet: async (userId, wallets, newWallet, mainCurrency) => {
    const { isNewCurrencyRequiringRates, fetchRates } = get();
    const allWallets = [...wallets, newWallet];

    // Check if the new wallet introduces a currency we don't have rates for
    if (isNewCurrencyRequiringRates(newWallet.currency_code, mainCurrency)) {
      await fetchRates(userId, allWallets, mainCurrency, false);
    }
  },

  handleWalletUpdate: async (
    userId,
    wallets,
    oldWallet,
    updatedWallet,
    mainCurrency
  ) => {
    const { isNewCurrencyRequiringRates, fetchRates } = get();
    const oldCurrency = oldWallet.currency_code;
    const newCurrency = updatedWallet.currency_code;

    // If currency changed, we might need to fetch new rates
    if (oldCurrency !== newCurrency) {
      if (isNewCurrencyRequiringRates(newCurrency, mainCurrency)) {
        // The 'wallets' array passed here should be the final array containing the updated wallet
        await fetchRates(userId, wallets, mainCurrency, false);
      }
    }
  },

  clearCache: async (userId) => {
    set({ error: null });

    try {
      await currencyService.clearCache(userId);
      
      set({
        rates: null,
        lastFetchTime: null,
        error: null,
      });

      showToast.success("Currency cache cleared");
    } catch (e) {
      handleStoreError(e, "Failed to clear currency cache", set);
      throw e;
    }
  },

  reset: () => {
    set({
      rates: null,
      loading: false,
      error: null,
      lastFetchTime: null,
    });
  },
});
