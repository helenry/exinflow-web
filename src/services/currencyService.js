// services/currencyService.js

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { CURRENCY_API, ENV } from "../constants";

/**
 * Currency service for handling exchange rate API calls and Firestore caching
 */
class CurrencyService {
  constructor() {
    this.apiKey = ENV.CURRENCYAPI.API_KEY;
    this.baseUrl = CURRENCY_API.BASE_URL;
  }

  /**
   * Fetch latest exchange rates from currencyapi.com
   * @param {string} baseCurrency - The base currency (user's main currency)
   * @param {Array<string>} targetCurrencies - Array of target currencies to get rates for
   * @returns {Promise<Object>} API response with exchange rates
   */
  async fetchExchangeRates(baseCurrency, targetCurrencies = []) {
    try {
      if (!this.apiKey) {
        throw new Error("Currency API key not configured");
      }

      if (targetCurrencies.length === 0) {
        return {
          data: {},
          meta: { last_updated_at: new Date().toISOString() },
        };
      }

      const url = new URL(`${this.baseUrl}${CURRENCY_API.ENDPOINTS.LATEST}`);
      url.searchParams.set("base_currency", baseCurrency);
      url.searchParams.set("currencies", targetCurrencies.join(","));
      url.searchParams.set("type", "fiat"); // Only get fiat currencies

      const response = await fetch(url, {
        method: "GET",
        headers: {
          apikey: this.apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `API request failed: ${response.status}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      throw error;
    }
  }

  /**
   * Get cached exchange rates from Firestore
   * @param {string} userId - User ID
   * @returns {Promise<Object|null>} Cached rates object or null if not found
   */
  async getCachedRates(userId) {
    try {
      const ratesDoc = await getDoc(doc(db, "currency_rates", userId));

      if (ratesDoc.exists()) {
        const data = ratesDoc.data();

        // Check if cache is still valid (less than 24 hours old)
        const lastUpdated = new Date(data.last_updated_at);
        const now = new Date();
        const cacheAge = now.getTime() - lastUpdated.getTime();

        if (cacheAge < CURRENCY_API.CACHE_DURATION) {
          return data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error getting cached rates:", error);
      return null;
    }
  }

  /**
   * Cache exchange rates to Firestore
   * @param {string} userId - User ID
   * @param {Object} ratesData - Exchange rates data from API
   * @param {string} baseCurrency - Base currency used for the rates
   * @returns {Promise<void>}
   */
  async cacheRates(userId, ratesData, baseCurrency) {
    try {
      const cacheData = {
        base_currency: baseCurrency,
        rates: ratesData.data || {},
        last_updated_at:
          ratesData.meta.last_updated_at || new Date().toISOString(),
        cached_at: new Date().toISOString(),
      };

      await setDoc(doc(db, "currency_rates", userId), cacheData);
    } catch (error) {
      console.error("Error caching rates:", error);
      throw error;
    }
  }

  /**
   * Get exchange rates with caching logic
   * @param {string} userId - User ID
   * @param {string} baseCurrency - Base currency
   * @param {Array<string>} targetCurrencies - Target currencies
   * @param {boolean} forceRefresh - Force refresh from API
   * @returns {Promise<Object>} Exchange rates data
   */
  async getRates(
    userId,
    baseCurrency,
    targetCurrencies = [],
    forceRefresh = false,
  ) {
    try {
      // If no target currencies, return empty rates
      if (targetCurrencies.length === 0) {
        return {
          base_currency: baseCurrency,
          rates: {},
          last_updated_at: new Date().toISOString(),
          from_cache: true,
        };
      }

      // Try to get cached rates first (unless force refresh)
      if (!forceRefresh) {
        const cachedRates = await this.getCachedRates(userId);

        if (cachedRates && cachedRates.base_currency === baseCurrency) {
          // Check if all required currencies are in cache
          const cachedCurrencies = Object.keys(cachedRates.rates);
          const allCurrenciesCached = targetCurrencies.every((currency) =>
            cachedCurrencies.includes(currency),
          );

          if (allCurrenciesCached) {
            return {
              ...cachedRates,
              from_cache: true,
            };
          }
        }
      }

      // Fetch fresh rates from API
      const freshRates = await this.fetchExchangeRates(
        baseCurrency,
        targetCurrencies,
      );

      // Cache the fresh rates
      await this.cacheRates(userId, freshRates, baseCurrency);

      return {
        base_currency: baseCurrency,
        rates: freshRates.data,
        last_updated_at: freshRates.meta.last_updated_at,
        from_cache: false,
      };
    } catch (error) {
      console.error("Error getting rates:", error);

      // Fallback to cached rates if API fails
      const cachedRates = await this.getCachedRates(userId);
      if (cachedRates) {
        return {
          ...cachedRates,
          from_cache: true,
          error: error.message,
        };
      }

      throw error;
    }
  }

  /**
   * Clear cached rates for a user
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  async clearCache(userId) {
    try {
      await updateDoc(doc(db, "currency_rates", userId), {
        cached_at: new Date(0).toISOString(), // Set to epoch to force refresh
      });
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  }
}

export const currencyService = new CurrencyService();
