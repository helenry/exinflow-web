// utils/validation.js
// This file centralizes validation logic, primarily for checking the uniqueness of names
// or other identifiers in a list of existing items.

import { normalizeString } from "./format"; // Imports a helper function to convert a string to lowercase.

/**
 * Validates that a given name is unique within an array of existing objects.
 * The check is case-insensitive and can exclude a specific object by its ID,
 * which is useful for update operations where the name might not be changing.
 * @param {Array<object>} existing - The array of existing objects to check against.
 * @param {string} name - The name to validate for uniqueness.
 * @param {string} [excludeId=null] - An optional ID of an object to exclude from the check.
 * @returns {boolean} Returns `true` if the name is unique, `false` otherwise.
 */
export const validateUniqueName = (existing, name, excludeId = null) => {
  // Normalize the input name to handle case-insensitivity.
  const normalized = normalizeString(name || "");
  // Use the `some()` array method to check if any existing item has a matching name.
  return !existing.some(
    (e) =>
      // Check if the normalized name of the existing item matches the input name.
      normalizeString(e.name) === normalized &&
      // Check if the ID of the existing item is NOT the one we are excluding (if an ID was provided).
      (!excludeId || e.id !== excludeId),
  );
};
