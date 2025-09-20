// handlers/subcategoryHandlers.js
const type = "subcategory";

export const createSubcategoryHandler = (openModal) => (categoryId) => {
  openModal({
    type,
    action: "create",
    parentId: categoryId
  });
};

export const editSubcategoryHandler = (openModal) => (categoryId, subcategory) => {
  openModal({
    type,
    action: "edit",
    itemId: subcategory.id,
    data: subcategory,
    parentId: categoryId
  });
};

export const deleteSubcategoryHandler = (deleteSubcategory, closeModal, modal) => 
  (categoryId, subcategoryId) => {
    // Displays a browser confirmation dialog. Not recommended for production apps.
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      // If the modal is currently open for the subcategory being deleted, close it.
      if (modal.isOpen && modal.type === type && modal.itemId === subcategoryId) {
        closeModal();
      }
      // Call the function to delete the subcategory from the database.
      deleteSubcategory(categoryId, subcategoryId);
    }
  };
