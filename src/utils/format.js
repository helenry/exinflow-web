// utils/format.js
// This file contains a collection of utility functions for data formatting and manipulation.
// These functions are designed to keep the application's business logic clean by centralizing
// common data transformations like string trimming, case normalization, and currency formatting.

import { TRIM_FIELDS } from "@/constants";
import { CURRENCY_OPTIONS } from "@/constants";

/**
 * Trims leading and trailing whitespace from specific string fields within an object.
 * This is useful for cleaning up user input from forms.
 * @param {object} input - The object containing the data to be trimmed.
 * @returns {object} A new object with specified string fields trimmed.
 */
export const trimStrings = (input) => {
  const trimmed = { ...input };
  // Iterates over a predefined list of field names.
  TRIM_FIELDS.forEach((field) => {
    // Checks if the field exists and is a string before trimming.
    if (typeof trimmed[field] === "string") {
      trimmed[field] = trimmed[field].trim();
    }
  });
  return trimmed;
};

/**
 * Finds and returns the currency object for a given ISO code.
 * @param {string} isoCode - The three-letter ISO currency code (e.g., 'USD').
 * @returns {object|undefined} The currency object from CURRENCY_OPTIONS, or undefined if not found.
 */
export const getCurrencySymbol = (isoCode) => {
  const currency = CURRENCY_OPTIONS.find(
    (item) => item.iso_code === isoCode.toUpperCase(),
  );
  return currency;
};

/**
 * Formats a numeric amount as a money string with two decimal places.
 * @param {number} amount - The numeric value to format.
 * @returns {string} The formatted string, e.g., "1,234.56". Returns "0.00" for non-numeric input.
 */
export const formatMoney = (amount) => {
  // Ensures the input is a number to prevent errors.
  if (typeof amount !== "number") return "0.00";

  // Uses the browser's built-in locale-aware number formatting.
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
