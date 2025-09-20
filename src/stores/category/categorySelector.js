// stores/category/categorySelectors.js
// This file contains a collection of "selector" functions for the category store.
// Selectors are functions that receive the store's state (via the `get` function) and
// return a specific, derived, or filtered piece of that state.
// This approach centralizes data access logic and promotes reusability.

export const categorySelectors = (get) => ({
  // Computed values (selectors)
  
  /**
   * Finds and returns a single category object by its ID.
   * @param {string} categoryId - The unique ID of the category.
   * @returns {object|undefined} The category object or `undefined` if not found.
   */
  getCategoryById: (categoryId) => {
    const { categories } = get();
    return categories.find((w) => w.id === categoryId);
  },

  /**
   * Filters the category list and returns only the categories that belong to a specific user.
   * @param {string} userUid - The unique user ID.
   * @returns {Array} An array of category objects for the specified user.
   */
  getCategoriesByUser: (userUid) => {
    const { categories } = get();
    return categories.filter((w) => w.user_uid === userUid);
  },

  // Additional useful selectors you might want to add
  
  /**
   * Returns the count of categories that are not marked as deleted.
   * @returns {number} The number of active categories.
   */
  getActiveCategoriesCount: () => {
    const { categories } = get();
    return categories.filter((w) => !w.is_deleted).length;
  },

  /**
   * Returns a filtered array of categories that have an `amount` greater than 0.
   * @returns {Array} An array of category objects with a positive amount.
   */
  getCategoriesWithAmount: () => {
    const { categories } = get();
    return categories.filter((w) => w.amount > 0);
  },

  /**
   * Calculates and returns the sum of the `amount` of all categories.
   * @returns {number} The total amount across all categories.
   */
  getTotalAmount: () => {
    const { categories } = get();
    return categories.reduce((total, category) => total + (category.amount || 0), 0);
  },
});
