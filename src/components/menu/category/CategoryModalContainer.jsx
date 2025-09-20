// components/menu/category/CategoryModalContainer.jsx
import { useCallback } from "react";
import useCategoryStore from "../../../stores/category/categoryStore";
import CategoryModal from "./CategoryModal";

const CategoryModalContainer = ({ action, itemId, initialData, onClose }) => {
  const { createCategory, updateCategory, loading } = useCategoryStore();

  const handleSubmit = useCallback(async (formData) => {
    try {
      if (action === "create") {
        await createCategory(formData);
      } else if (action === "edit") {
        await updateCategory(itemId, formData);
      }
      onClose();
    } catch (error) {
      console.error("Category modal submission error:", error);
    }
  }, [action, itemId, createCategory, updateCategory, onClose]);

  return (
    <CategoryModal
      onSubmit={handleSubmit}
      onCancel={onClose}
      initialData={initialData}
      loading={loading}
    />
  );
};

export default CategoryModalContainer;