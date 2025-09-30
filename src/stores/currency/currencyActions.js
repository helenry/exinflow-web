import { currencyStore } from "./currencyStore";
import { currencyService } from "../../services/currencyService";
import toast from "react-hot-toast";

/**
 * Currency actions for managing exchange rates
 */
export const currencyActions = {
  /**
   * Get unique currencies from wallets (excluding main currency)
   * @param {Array} wallets - Array of wallet objects
   * @param {string} mainCurrency - User's main currency
   * @returns {Array<string>} Array of unique currencies
   */
  getUniqueCurrencies(wallets, mainCurrency) {
    const uniqueCurrencies = [
      ...new Set(
        wallets
          .map((wallet) => wallet.currency_code)
          .filter((currency) => currency && currency !== mainCurrency),
      ),
    ];

    return uniqueCurrencies;
  },

  /**
   * Check if currency rates need to be fetched
   * @param {Array} wallets - Array of wallet objects
   * @param {string} mainCurrency - User's main currency
   * @returns {boolean} True if rates are needed
   */
  shouldFetchRates(wallets, mainCurrency) {
    const uniqueCurrencies = this.getUniqueCurrencies(wallets, mainCurrency);
    const shouldFetch = uniqueCurrencies.length > 0;

    return shouldFetch;
  },

  /**
   * Fetch currency rates and update store
   * @param {string} userId - User ID
   * @param {Array} wallets - Array of wallet objects
   * @param {string} mainCurrency - User's main currency
   * @param {boolean} forceRefresh - Force refresh from API
   * @returns {Promise<void>}
   */
  async fetchRates(userId, wallets, mainCurrency, forceRefresh = false) {
    try {
      currencyStore.getState().setLoading(true);
      currencyStore.getState().clearError();

      // Check if we need to fetch rates
      if (!this.shouldFetchRates(wallets, mainCurrency)) {
        currencyStore.getState().setRates({
          base_currency: mainCurrency,
          rates: {},
          last_updated_at: new Date().toISOString(),
          from_cache: true,
        });
        return;
      }

      const uniqueCurrencies = this.getUniqueCurrencies(wallets, mainCurrency);

      const ratesData = await currencyService.getRates(
        userId,
        mainCurrency,
        uniqueCurrencies,
        forceRefresh,
      );

      currencyStore.getState().setRates(ratesData);

      if (!forceRefresh && !ratesData.from_cache) {
        toast.success("Exchange rates updated successfully");
      } else if (forceRefresh) {
        toast.success("Exchange rates refreshed");
      }
    } catch (error) {
      currencyStore.getState().setError(error.message);

      if (forceRefresh) {
        toast.error("Failed to refresh exchange rates");
      } else {
        toast.error("Failed to fetch exchange rates");
      }
    } finally {
      currencyStore.getState().setLoading(false);
    }
  },

  /**
   * Force refresh currency rates
   * @param {string} userId - User ID
   * @param {Array} wallets - Array of wallet objects
   * @param {string} mainCurrency - User's main currency
   * @returns {Promise<void>}
   */
  async refreshRates(userId, wallets, mainCurrency) {
    await this.fetchRates(userId, wallets, mainCurrency, true);
  },

  /**
   * Check if rates are stale and need refresh
   * @returns {boolean} True if rates need refresh
   */
  needsRefresh() {
    const state = currencyStore.getState().getState();

    if (!state.rates || !state.rates.last_updated_at) {
      return true;
    }

    const lastUpdated = new Date(state.rates.last_updated_at);
    const now = new Date();
    const ageInHours =
      (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);

    const needs = ageInHours >= 24;

    // Refresh if older than 24 hours
    return needs;
  },

  /**
   * Check if a new currency requires rate fetching
   * @param {string} newCurrency - The new currency code
   * @param {string} mainCurrency - User's main currency
   * @returns {boolean} True if new currency needs rates
   */
  isNewCurrencyRequiringRates(newCurrency, mainCurrency) {
    if (newCurrency === mainCurrency) {
      return false;
    }

    const state = currencyStore.getState().getState();
    const currentRates = state.rates?.rates || {};

    const needsFetch = !currentRates.hasOwnProperty(newCurrency);

    return needsFetch;
  },

  /**
   * Handle new wallet creation with currency check
   * @param {string} userId - User ID
   * @param {Array} wallets - Current wallets array
   * @param {Object} newWallet - New wallet object
   * @param {string} mainCurrency - User's main currency
   * @returns {Promise<void>}
   */
  async handleNewWallet(userId, wallets, newWallet, mainCurrency) {
    const allWallets = [...wallets, newWallet];

    // Check if the new wallet introduces a currency we don't have rates for
    if (
      this.isNewCurrencyRequiringRates(newWallet.currency_code, mainCurrency)
    ) {
      await this.fetchRates(userId, allWallets, mainCurrency, false);
    }
  },

  /**
   * Handle wallet update with currency check
   * @param {string} userId - User ID
   * @param {Array} wallets - Current wallets array (already updated)
   * @param {Object} oldWallet - Previous wallet state
   * @param {Object} updatedWallet - Updated wallet object
   * @param {string} mainCurrency - User's main currency
   * @returns {Promise<void>}
   */
  async handleWalletUpdate(
    userId,
    wallets,
    oldWallet,
    updatedWallet,
    mainCurrency,
  ) {
    const oldCurrency = oldWallet.currency_code;
    const newCurrency = updatedWallet.currency_code;

    // If currency changed, we might need to fetch new rates
    if (oldCurrency !== newCurrency) {
      if (this.isNewCurrencyRequiringRates(newCurrency, mainCurrency)) {
        // The 'wallets' array passed here should be the final array containing the updated wallet
        await this.fetchRates(userId, wallets, mainCurrency, false);
      }
    }
  },

  /**
   * Initialize currency rates on app start
   * @param {string} userId - User ID
   * @param {Array} wallets - Array of wallet objects
   * @param {string} mainCurrency - User's main currency
   * @returns {Promise<void>}
   */
  async initializeRates(userId, wallets, mainCurrency) {
    if (this.shouldFetchRates(wallets, mainCurrency)) {
      await this.fetchRates(userId, wallets, mainCurrency, false);
    }
  },

  /**
   * Clear currency cache
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  async clearCache(userId) {
    try {
      await currencyService.clearCache(userId);
      currencyStore.getState().clearRates();
      toast.success("Currency cache cleared");
    } catch (error) {
      toast.error("Failed to clear currency cache", error);
    }
  },
};
