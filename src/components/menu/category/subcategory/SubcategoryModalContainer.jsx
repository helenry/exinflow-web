// components/menu/category/subcategory/SubcategoryModalContainer.jsx
import { useCallback } from "react";
import useCategoryStore from "../../../../stores/category/categoryStore";
import SubcategoryModal from "./SubcategoryModal";

const CategoryModalContainer = ({ action, itemId, initialData, parentId, onClose }) => {
  const { createSubcategory, updateSubcategory, loading } = useCategoryStore();

  const handleSubmit = useCallback(async (formData) => {
    try {
      if (action === "create") {
        await createSubcategory(parentId, formData);
      } else if (action === "edit") {
        await updateSubcategory(parentId, itemId, formData);
      }
      onClose();
    } catch (error) {
      console.error("Subcategory modal submission error:", error);
    }
  }, [action, itemId, createSubcategory, updateSubcategory, onClose]);

  return (
    <SubcategoryModal
      onSubmit={handleSubmit}
      onCancel={onClose}
      initialData={initialData}
      loading={loading}
    />
  );
};

export default CategoryModalContainer;