// stores/category/subcategory/subcategoryActions.js
import {
  createSubcategoryService,
  updateSubcategoryService,
  deleteSubcategoryService
} from "../../../services/subcategoryService";
import { trimStrings } from "../../../utils/format";
import {
  validateSubcategory,
  validateSubcategoryUniqueness 
} from "./subcategoryValidation";
import { createBaseEntityData, createUpdateData, handleStoreError, throwErrorWithToast } from "../../../utils/storeHelpers";
import { showToast } from "../../../utils/toast";

export const subcategoryActions = (set, get) => ({
  createSubcategory: async (categoryId, subcategoryData) => {
    const { categories, currentUserUid } = get();

    set({ error: null });

    try {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) {
        throwErrorWithToast("Category not found");
      }

      const trimmed = trimStrings(subcategoryData);
      
      if (!validateSubcategoryUniqueness(category.subcategories || [], trimmed.name)) {
        throwErrorWithToast("Subcategory name must be unique within this category");
      }

      const newSubcategory = createBaseEntityData(trimmed, currentUserUid);

      validateSubcategory(newSubcategory);
      const docRef = await createSubcategoryService(categoryId, newSubcategory);

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                subcategories: [
                  ...(cat.subcategories || []),
                  { id: docRef.id, ...newSubcategory, created_at: new Date() },
                ],
              }
            : cat,
        ),
      }));

      showToast.success("Subcategory created successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to create subcategory", set);
      throw e;
    }
  },

  updateSubcategory: async (categoryId, subcategoryId, updatedData) => {
    const { categories, currentUserUid } = get();

    set({ error: null });

    try {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) {
        throwErrorWithToast("Category not found");
      }

      const existing = category.subcategories?.find((s) => s.id === subcategoryId);
      if (!existing) {
        throwErrorWithToast("Subcategory not found");
      }

      const trimmed = trimStrings(updatedData);
      
      if (!validateSubcategoryUniqueness(category.subcategories || [], trimmed.name, subcategoryId)) {
        throwErrorWithToast("Subcategory name must be unique within this category");
      }

      const updateData = createUpdateData(
        { ...existing, ...trimmed },
        currentUserUid
      );

      validateSubcategory(updateData);
      await updateSubcategoryService(categoryId, subcategoryId, updateData);

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                subcategories: cat.subcategories?.map((sub) =>
                  sub.id === subcategoryId
                    ? { ...sub, ...trimmed, updated_at: new Date() }
                    : sub,
                ),
              }
            : cat,
        ),
      }));

      showToast.success("Subcategory updated successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to update subcategory", set);
      throw e;
    }
  },

  deleteSubcategory: async (categoryId, subcategoryId) => {
    set({ error: null });

    try {
      await deleteSubcategoryService(categoryId, subcategoryId);
      
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                subcategories: cat.subcategories?.filter((sub) => sub.id !== subcategoryId),
              }
            : cat,
        ),
      }));

      showToast.success("Subcategory deleted successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to delete subcategory", set);
      throw e;
    }
  },
});