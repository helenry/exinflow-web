// hooks/useTotalBalance.js

import { useMemo } from "react";
import { convertCurrency } from "../utils/currencyConverter";
import { currencyStore } from "../stores/currency/currencyStore";

/**
 * Custom hook to calculate total balance across all wallets
 * @param {Array} wallets - Array of wallet objects with current_balance and currency_code
 * @param {string} mainCurrency - User's main currency code
 * @returns {Object} Total balance information
 */
export const useTotalBalance = (wallets = [], mainCurrency) => {
  // Subscribe to currency store
  const currencyRates = currencyStore((state) => state.rates);
  const isLoadingRates = currencyStore((state) => state.loading);
  const ratesError = currencyStore((state) => state.error);

  const totalBalanceData = useMemo(() => {
    if (!wallets || wallets.length === 0) {
      return {
        totalBalance: 0,
        mainCurrency,
        breakdown: [],
        hasMultipleCurrencies: false,
        needsConversion: false,
        canCalculate: true,
        error: null,
      };
    }

    // Get unique currencies
    const uniqueCurrencies = [
      ...new Set(wallets.map((wallet) => wallet.currency_code).filter(Boolean)),
    ];

    const hasMultipleCurrencies = uniqueCurrencies.length > 1;
    const needsConversion = uniqueCurrencies.some(
      (currency) => currency !== mainCurrency,
    );

    // If no conversion needed (all wallets use main currency)
    if (!needsConversion) {
      const totalBalance = wallets.reduce((sum, wallet) => {
        return sum + (parseFloat(wallet.current_balance) || 0);
      }, 0);

      const breakdown = wallets.map((wallet) => ({
        walletId: wallet.id,
        name: wallet.name,
        originalAmount: parseFloat(wallet.current_balance) || 0,
        originalCurrency: wallet.currency_code,
        convertedAmount: parseFloat(wallet.current_balance) || 0,
        convertedCurrency: mainCurrency,
        rate: 1,
      }));

      return {
        totalBalance,
        mainCurrency,
        breakdown,
        hasMultipleCurrencies,
        needsConversion: false,
        canCalculate: true,
        error: null,
      };
    }

    // Conversion needed - check if we have rates
    if (!currencyRates || !currencyRates.rates) {
      return {
        totalBalance: 0,
        mainCurrency,
        breakdown: [],
        hasMultipleCurrencies,
        needsConversion: true,
        canCalculate: false,
        error: "Exchange rates not available",
      };
    }

    // Check if all required currencies have rates
    const foreignCurrencies = uniqueCurrencies.filter(
      (currency) => currency !== mainCurrency,
    );
    const missingCurrencies = foreignCurrencies.filter(
      (currency) => !currencyRates.rates[currency],
    );

    if (missingCurrencies.length > 0) {
      return {
        totalBalance: 0,
        mainCurrency,
        breakdown: [],
        hasMultipleCurrencies,
        needsConversion: true,
        canCalculate: false,
        error: `Missing exchange rates for: ${missingCurrencies.join(", ")}`,
      };
    }

    // Calculate total with conversions
    let totalBalance = 0;
    const breakdown = [];

    for (const wallet of wallets) {
      const originalAmount = parseFloat(wallet.current_balance) || 0;
      const currency = wallet.currency_code;

      let convertedAmount;
      let rate;

      if (currency === mainCurrency) {
        convertedAmount = originalAmount;
        rate = 1;
      } else {
        const exchangeRate = currencyRates.rates[currency]?.value;
        if (!exchangeRate) {
          // This case should ideally be caught by the check above, but as a safeguard:
          return {
            totalBalance: 0,
            mainCurrency,
            breakdown: [],
            hasMultipleCurrencies,
            needsConversion: true,
            canCalculate: false,
            error: `No exchange rate found for ${currency}`,
          };
        }

        convertedAmount = convertCurrency(originalAmount, 1, exchangeRate);
        rate = exchangeRate;
      }

      totalBalance += convertedAmount;

      breakdown.push({
        walletId: wallet.id,
        name: wallet.name,
        originalAmount,
        originalCurrency: currency,
        convertedAmount,
        convertedCurrency: mainCurrency,
        rate,
      });
    }

    return {
      totalBalance,
      mainCurrency,
      breakdown,
      hasMultipleCurrencies,
      needsConversion: true,
      canCalculate: true,
      error: null,
    };
  }, [wallets, mainCurrency, currencyRates]);

  return {
    ...totalBalanceData,
    isLoadingRates,
    ratesError,
    lastUpdated: currencyRates?.last_updated_at || null,
    isFromCache: currencyRates?.from_cache || false,
  };
};
