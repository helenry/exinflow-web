// utils/type.js
// This file contains a set of helper functions primarily focused on type conversion
// and data transformation, such as handling Firestore Timestamps and color formats.

import { Timestamp } from "firebase/firestore";

/**
 * Converts Firestore Timestamp objects within a data object to native JavaScript Date objects.
 * This is crucial for correctly displaying and manipulating dates in the client-side application.
 * The function is designed to be non-destructive by creating a new object.
 * @param {object} wallet - The data object containing Firestore timestamp fields (e.g., created_at, updated_at).
 * @returns {object} A new object with the timestamp fields converted to Date objects.
 */
export const convertFirestoreTimestamps = (wallet) => ({
  ...wallet,
  // Check if `created_at` is a Firestore Timestamp and convert it if true.
  created_at:
    wallet.created_at instanceof Timestamp
      ? wallet.created_at.toDate()
      : wallet.created_at,
  // Check if `updated_at` is a Firestore Timestamp and convert it if true.
  updated_at:
    wallet.updated_at instanceof Timestamp
      ? wallet.updated_at.toDate()
      : wallet.updated_at,
});

/**
 * Converts a hexadecimal color code to an RGBA color string.
 * @param {string} hex - The hexadecimal color string, e.g., "#RRGGBB".
 * @param {number} alpha - The alpha (opacity) value, a number between 0 and 1. Defaults to 1.
 * @returns {string} The RGBA color string, e.g., "rgba(255, 0, 0, 0.5)".
 */
export const hexToRgba = (hex, alpha = 1) => {
  // Parse the red component (first two characters after '#') from hexadecimal to an integer.
  const r = parseInt(hex.slice(1, 3), 16);
  // Parse the green component.
  const g = parseInt(hex.slice(3, 5), 16);
  // Parse the blue component.
  const b = parseInt(hex.slice(5, 7), 16);
  // Construct and return the final RGBA string.
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
