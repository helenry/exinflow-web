// stores/currency/currencyStore.js

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

/**
 * Currency store for managing exchange rates state
 */
export const currencyStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    rates: null, // { base_currency, rates: {}, last_updated_at, from_cache }
    loading: false,
    error: null,
    lastFetchTime: null,

    // Actions
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
      const state = get();
      const rate = state.rates?.rates?.[currencyCode] || null;
      return rate;
    },

    getBaseCurrency: () => {
      const state = get();
      const baseCurrency = state.rates?.base_currency || null;
      return baseCurrency;
    },

    isLoading: () => {
      const loading = get().loading;
      return loading;
    },

    hasError: () => {
      const hasErr = get().error !== null;
      return hasErr;
    },

    getError: () => {
      const error = get().error;
      return error;
    },

    hasRates: () => {
      const state = get();
      const hasR = state.rates !== null;
      return hasR;
    },

    isRatesFromCache: () => {
      const state = get();
      const fromCache = state.rates?.from_cache === true;
      return fromCache;
    },

    getLastUpdated: () => {
      const state = get();
      const lastUpdated = state.rates?.last_updated_at || null;
      return lastUpdated;
    },

    getLastFetchTime: () => {
      const lastFetchTime = get().lastFetchTime;
      return lastFetchTime;
    },

    // Check if rates are stale (older than 24 hours)
    isStale: () => {
      const state = get();
      if (!state.rates?.last_updated_at) {
        return true;
      }

      const lastUpdated = new Date(state.rates.last_updated_at);
      const now = new Date();
      const ageInHours =
        (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
      const isStale = ageInHours >= 24;

      return isStale;
    },

    // Check if we have all required currencies
    hasAllCurrencies: (requiredCurrencies) => {
      const state = get();
      if (!state.rates?.rates) {
        return false;
      }

      const availableCurrencies = Object.keys(state.rates.rates);
      const allPresent = requiredCurrencies.every((currency) =>
        availableCurrencies.includes(currency),
      );

      return allPresent;
    },

    // Get missing currencies that we don't have rates for
    getMissingCurrencies: (requiredCurrencies) => {
      const state = get();
      if (!state.rates?.rates) {
        return requiredCurrencies;
      }

      const availableCurrencies = Object.keys(state.rates.rates);
      const missing = requiredCurrencies.filter(
        (currency) => !availableCurrencies.includes(currency),
      );

      return missing;
    },

    // Reset store to initial state
    reset: () => {
      set({
        rates: null,
        loading: false,
        error: null,
        lastFetchTime: null,
      });
    },
  })),
);
