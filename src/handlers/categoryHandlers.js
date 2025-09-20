// handlers/categoryHandlers.js
const type = "category";

export const createCategoryHandler = (openModal) => () => {
  openModal({
    type,
    action: "create",
  });
};

export const editCategoryHandler = (openModal) => (category) => {
  openModal({
    type,
    action: "edit",
    itemId: category.id,
    data: category,
  });
};

export const deleteCategoryHandler = (deleteCategory, closeModal, modal) => 
  (categoryId) => {
    // Displays a browser confirmation dialog. Not recommended for production apps.
    if (window.confirm("Are you sure you want to delete this category?")) {      
      // If the modal is currently open for the category being deleted, close it.
      if (modal.isOpen && modal.type === type && modal.itemId === categoryId) {
        closeModal();
      }
      // Call the function to delete the category from the database.
      deleteCategory(categoryId);
    }
  };
