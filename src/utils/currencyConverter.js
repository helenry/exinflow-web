// utils/currencyConverter.js
/**
 * Currency conversion utility functions
 */

/**
 * Convert amount from one currency to another using exchange rates
 * @param {number} amount - Amount to convert
 * @param {number} fromRate - Exchange rate of source currency (relative to base)
 * @param {number} toRate - Exchange rate of target currency (relative to base)
 * @returns {number} Converted amount
 */
export const convertCurrency = (amount, fromRate = 1, toRate = 1) => {
  if (!amount || amount === 0) return 0;
  if (!fromRate || !toRate) return 0;

  // Convert: amount / fromRate * toRate
  // But since currencyapi gives us rates relative to base currency,
  // and we're converting TO the base currency, we just divide by the rate
  return amount / toRate;
};

/**
 * Convert amount to base currency
 * @param {number} amount - Amount in foreign currency
 * @param {number} exchangeRate - Exchange rate (foreign currency per base currency)
 * @returns {number} Amount in base currency
 */
export const convertToBaseCurrency = (amount, exchangeRate = 1) => {
  return convertCurrency(amount, 1, exchangeRate);
};

/**
 * Convert amount from base currency to target currency
 * @param {number} amount - Amount in base currency
 * @param {number} exchangeRate - Exchange rate (target currency per base currency)
 * @returns {number} Amount in target currency
 */
export const convertFromBaseCurrency = (amount, exchangeRate = 1) => {
  return amount * exchangeRate;
};

/**
 * Calculate total balance across multiple wallets with different currencies
 * @param {Array} wallets - Array of wallet objects
 * @param {string} baseCurrency - Base currency code
 * @param {Object} exchangeRates - Exchange rates object from currencyapi
 * @returns {Object} Calculation result with total and breakdown
 */
export const calculateTotalBalance = (
  wallets = [],
  baseCurrency,
  exchangeRates = {},
) => {
  if (!wallets || wallets.length === 0) {
    return {
      total: 0,
      baseCurrency,
      breakdown: [],
      hasConversions: false,
    };
  }

  let total = 0;
  const breakdown = [];
  let hasConversions = false;

  for (const wallet of wallets) {
    const amount = parseFloat(wallet.current_balance) || 0;
    const currency = wallet.currency_code;

    let convertedAmount = amount;
    let rate = 1;

    if (currency === baseCurrency) {
      // Same currency, no conversion needed
      convertedAmount = amount;
      rate = 1;
    } else {
      // Different currency, need conversion
      hasConversions = true;
      const exchangeRate = exchangeRates[currency]?.value;

      if (exchangeRate) {
        convertedAmount = convertToBaseCurrency(amount, exchangeRate);
        rate = exchangeRate;
      } else {
        // No rate available, cannot convert
        convertedAmount = 0;
        rate = null;
      }
    }

    total += convertedAmount;

    breakdown.push({
      walletId: wallet.id,
      walletName: wallet.name,
      originalAmount: amount,
      originalCurrency: currency,
      convertedAmount,
      conversionRate: rate,
      baseCurrency,
    });
  }

  return {
    total,
    baseCurrency,
    breakdown,
    hasConversions,
  };
};

/**
 * Get conversion rate between two currencies
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @param {string} baseCurrency - Base currency code used in rates
 * @param {Object} exchangeRates - Exchange rates object from currencyapi
 * @returns {number|null} Conversion rate or null if cannot calculate
 */
export const getConversionRate = (
  fromCurrency,
  toCurrency,
  baseCurrency,
  exchangeRates = {},
) => {
  if (fromCurrency === toCurrency) {
    return 1;
  }

  // If converting to/from base currency
  if (fromCurrency === baseCurrency) {
    const toRate = exchangeRates[toCurrency]?.value;
    return toRate || null;
  }

  if (toCurrency === baseCurrency) {
    const fromRate = exchangeRates[fromCurrency]?.value;
    return fromRate ? 1 / fromRate : null;
  }

  // Converting between two non-base currencies
  const fromRate = exchangeRates[fromCurrency]?.value;
  const toRate = exchangeRates[toCurrency]?.value;

  if (fromRate && toRate) {
    return toRate / fromRate;
  }

  return null;
};

/**
 * Format currency with proper precision
 * @param {number} amount - Amount to format
 * @param {number} precision - Decimal places (default: 2)
 * @returns {number} Formatted amount
 */
export const roundCurrency = (amount, precision = 2) => {
  if (!amount || isNaN(amount)) return 0;
  return Math.round(amount * Math.pow(10, precision)) / Math.pow(10, precision);
};

/**
 * Validate exchange rate data
 * @param {Object} ratesData - Rates data from API
 * @returns {boolean} True if valid
 */
export const validateRatesData = (ratesData) => {
  if (!ratesData || typeof ratesData !== "object") {
    return false;
  }

  if (!ratesData.data || typeof ratesData.data !== "object") {
    return false;
  }

  if (!ratesData.meta || !ratesData.meta.last_updated_at) {
    return false;
  }

  return true;
};

/**
 * Check if exchange rates are stale
 * @param {string} lastUpdated - Last updated timestamp
 * @param {number} maxAgeHours - Maximum age in hours (default: 24)
 * @returns {boolean} True if rates are stale
 */
export const areRatesStale = (lastUpdated, maxAgeHours = 24) => {
  if (!lastUpdated) return true;

  const lastUpdate = new Date(lastUpdated);
  const now = new Date();
  const ageHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);

  return ageHours > maxAgeHours;
};

/**
 * Get unique currencies from wallets
 * @param {Array} wallets - Array of wallet objects
 * @param {boolean} excludeBase - Exclude base currency from result
 * @param {string} baseCurrency - Base currency to exclude
 * @returns {Array<string>} Array of unique currency codes
 */
export const getUniqueCurrencies = (
  wallets = [],
  excludeBase = false,
  baseCurrency = null,
) => {
  const currencies = wallets
    .map((wallet) => wallet.currency_code)
    .filter(Boolean)
    .filter((currency) => !excludeBase || currency !== baseCurrency);

  return [...new Set(currencies)];
};

/**
 * Check if multiple currencies are present in wallets
 * @param {Array} wallets - Array of wallet objects
 * @returns {boolean} True if multiple currencies found
 */
export const hasMultipleCurrencies = (wallets = []) => {
  const unique = getUniqueCurrencies(wallets);
  return unique.length > 1;
};

/**
 * Calculate portfolio summary with currency breakdown
 * @param {Array} wallets - Array of wallet objects
 * @param {string} baseCurrency - Base currency code
 * @param {Object} exchangeRates - Exchange rates object
 * @returns {Object} Portfolio summary
 */
export const calculatePortfolioSummary = (
  wallets = [],
  baseCurrency,
  exchangeRates = {},
) => {
  const { total, breakdown, hasConversions } = calculateTotalBalance(
    wallets,
    baseCurrency,
    exchangeRates,
  );

  // Group by currency
  const byCurrency = {};
  breakdown.forEach((item) => {
    const currency = item.originalCurrency;
    if (!byCurrency[currency]) {
      byCurrency[currency] = {
        currency,
        totalAmount: 0,
        walletCount: 0,
        convertedAmount: 0,
      };
    }

    byCurrency[currency].totalAmount += item.originalAmount;
    byCurrency[currency].convertedAmount += item.convertedAmount;
    byCurrency[currency].walletCount++;
  });

  return {
    totalBalance: total,
    baseCurrency,
    hasConversions,
    currencyBreakdown: Object.values(byCurrency),
    walletCount: wallets.length,
    currencyCount: Object.keys(byCurrency).length,
  };
};
