// stores/category/categoryValidation.js
// This file centralizes all validation logic for category objects,
// ensuring data integrity before any create or update operations are performed.

import { categorySchema } from "../../models/categorySchema";

/**
 * Validates a category object against the category schema using Zod.
 * This function serves as the core schema validation for all other validation functions.
 * @param {Object} category - The category object to validate.
 * @throws {z.ZodError} - Throws a Zod error if validation fails, providing detailed error messages.
 * @returns {Object} - The validated category object, which Zod guarantees is correctly typed.
 */
export const validateCategory = (category) => {
  return categorySchema.parse(category);
};

/**
 * Validates that a category name is unique within the existing categories array.
 * It's case-insensitive and ignores leading/trailing whitespace.
 * @param {Array} categories - An array of existing category objects.
 * @param {string} name - The name to check for uniqueness.
 * @param {string} excludeId - Optional. The ID of a category to exclude from the uniqueness check.
 * This is crucial for update operations where the name might not change.
 * @returns {boolean} - Returns `true` if the name is unique, `false` otherwise.
 */
export const validateCategoryUniqueness = (categories, name, excludeId = null) => {
  const trimmedName = name?.trim().toLowerCase();
  // If the name is empty or invalid, it's not considered unique.
  if (!trimmedName) return false;
  
  // The `.some()` method checks if at least one element in the array passes the test.
  // We return the inverse, as we want to know if a matching name *doesn't* exist.
  return !categories.some((category) => {
    const categoryName = category.name?.trim().toLowerCase();
    // A match is found if the names are the same AND the category's ID is not the one we're excluding.
    return categoryName === trimmedName && category.id !== excludeId;
  });
};

/**
 * Validates category data before a creation operation.
 * It performs both schema validation and uniqueness checks.
 * @param {Object} categoryData - The new category data to validate.
 * @param {Array} existingCategories - An array of all current categories to check for name uniqueness.
 * @returns {Object} - An object containing a `isValid` boolean and an `errors` array with any validation messages.
 */
export const validateCategoryForCreation = (categoryData, existingCategories = []) => {
  const errors = [];
  
  try {
    // Attempt basic schema validation. We pass a temporary `Date` object since Zod cannot validate `serverTimestamp()`.
    validateCategory({ ...categoryData, created_at: new Date() });
  } catch (e) {
    // If Zod throws an error, extract the specific error messages and add them to the errors array.
    if (e.errors) {
      errors.push(...e.errors.map(err => err.message));
    }
  }
  
  // Perform uniqueness validation and add an error if the name is not unique.
  if (!validateCategoryUniqueness(existingCategories, categoryData.name)) {
    errors.push("Category name must be unique");
  }
  
  // The function returns the final validation result.
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates category data before an update operation.
 * It merges the updated data with the existing object for a full validation.
 * @param {Object} updatedData - The partial category data containing the fields to update.
 * @param {Object} existingCategory - The full category object as it currently exists.
 * @param {Array} allCategories - An array of all categories to check for name uniqueness.
 * @returns {Object} - An object containing a `isValid` boolean and an `errors` array.
 */
export const validateCategoryForUpdate = (updatedData, existingCategory, allCategories = []) => {
  const errors = [];
  
  // Merge the updated data with the existing object to create a complete object for schema validation.
  const merged = {
    ...existingCategory,
    ...updatedData,
    updated_at: new Date()
  };
  
  try {
    // Attempt to validate the merged object against the schema.
    validateCategory(merged);
  } catch (e) {
    if (e.errors) {
      errors.push(...e.errors.map(err => err.message));
    }
  }
  
  // Perform uniqueness validation, passing the existing category's ID to exclude it from the check.
  if (updatedData.name && !validateCategoryUniqueness(allCategories, updatedData.name, existingCategory.id)) {
    errors.push("Category name must be unique");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
