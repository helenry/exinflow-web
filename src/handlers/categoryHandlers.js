// handlers/categoryHandlers.js
// This file contains a set of "handler" functions that are designed to be used
// as event handlers (e.g., for button clicks) in the user interface.
// They centralize the logic for opening modals and triggering actions based on user interactions.

const type = "category";

/**
 * Creates a click handler function to open a modal for creating a new category.
 * @param {Function} openModal - The function to open the modal, passed from a custom hook.
 * @returns {Function} A function that, when called, opens the modal for category creation.
 */
export const createCategoryHandler = (openModal) => () => {
  openModal({
    type,
    action: "create",
  });
};

/**
 * Creates a click handler function to open a modal for editing an existing category.
 * It passes the specific category's data to the modal.
 * @param {Function} openModal - The function to open the modal.
 * @returns {Function} A function that, when called with a category object, opens the modal
 * for editing that specific category.
 */
export const editCategoryHandler = (openModal) => (category) => {
  openModal({
    type,
    action: "edit",
    itemId: category.id,
    data: category,
  });
};

/**
 * Creates a handler function to delete a category.
 * This function handles the confirmation, state updates, and then calls the deletion service.
 * NOTE: The use of `window.confirm` is not ideal for this environment and should be
 * replaced with a custom modal component for a better user experience.
 * @param {Function} deleteCategory - The function to call the delete service.
 * @param {Function} closeModal - The function to close the modal.
 * @param {Function} setActiveCategory - The function to update the active category state.
 * @param {object} modal - The current state of the modal.
 * @returns {Function} A function that, when called with a category ID, handles the deletion process.
 */
export const deleteCategoryHandler = (deleteCategory, closeModal, setActiveCategory, modal) => 
  (categoryId) => {
    // Displays a browser confirmation dialog. Not recommended for production apps.
    if (window.confirm("Are you sure you want to delete this category?")) {
      // If the currently active category is the one being deleted, set it to null.
      setActiveCategory(prev => prev === categoryId ? null : prev);
      
      // If the modal is currently open for the category being deleted, close it.
      if (modal.isOpen && modal.type === type && modal.itemId === categoryId) {
        closeModal();
      }
      // Call the function to delete the category from the database.
      deleteCategory(categoryId);
    }
  };
