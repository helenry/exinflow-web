// stores/category/categoryActions.js
import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../../services/categoryService";
import { trimStrings } from "../../utils/format";
import { convertFirestoreTimestamps } from "../../utils/type";
import {
  validateCategory,
  validateCategoryUniqueness,
} from "./categoryValidation";
import {
  createBaseData,
  createUpdateData,
  handleStoreError,
  throwErrorWithToast,
} from "../../utils/storeHelpers";
import { showToast } from "../../utils/toast";
import useTransactionStore from "../transaction/transactionStore";

export const categoryActions = (set, get) => ({
  setCurrentUser: (userUid) => {
    const { currentUserUid, getCategories, reset } = get();

    if (currentUserUid !== userUid) {
      set({ currentUserUid: userUid });

      if (userUid) {
        getCategories(userUid);
      } else {
        reset();
      }
    }
  },

  getCategories: async (userUid) => {
    if (!userUid) return;

    set({ loading: true, error: null });

    try {
      const data = await getCategoriesService(userUid);

      const categoryList = data
        .map(convertFirestoreTimestamps)
        .filter((category) => {
          try {
            validateCategory(category);
            return true;
          } catch (e) {
            console.warn("Invalid category skipped:", e);
            return false;
          }
        });

      const activeCategories = categoryList
        .filter((item) => !item.is_deleted) // keep only non-deleted categories
        .map((item) => ({
          ...item,
          subcategories: item.subcategories
            ? item.subcategories.filter((sub) => !sub.is_deleted)
            : [],
        }));

      set({
        categories: activeCategories,
        categoriesWithDeleted: categoryList,
        loading: false,
      });

      // Refresh transaction store if it has data and current user matches
      const transactionStore = useTransactionStore.getState();
      if (
        transactionStore.currentUserUid === userUid &&
        transactionStore.transactions.length > 0
      ) {
        transactionStore.refreshTransactionData();
      }
    } catch (e) {
      console.error(e);
      set({ error: "Failed to load categories", loading: false });
    }
  },

  createCategory: async (categoryData) => {
    const { categories, currentUserUid } = get();

    set({ error: null });

    try {
      const trimmed = trimStrings(categoryData);

      if (!validateCategoryUniqueness(categories, trimmed.name)) {
        throwErrorWithToast("Category name must be unique");
      }

      const newCategory = createBaseData(trimmed, currentUserUid);

      validateCategory(newCategory);
      const docRef = await createCategoryService(newCategory);

      // Update local state
      set((state) => ({
        categories: [
          ...state.categories,
          { id: docRef.id, ...newCategory, created_at: new Date() },
        ],
        categoriesWithDeleted: [
          ...state.categoriesWithDeleted,
          { id: docRef.id, ...newCategory, created_at: new Date() },
        ],
      }));

      // Trigger cross-store update
      const transactionStore = useTransactionStore.getState();
      if (
        transactionStore.currentUserUid === currentUserUid &&
        transactionStore.transactions.length > 0
      ) {
        transactionStore.refreshTransactionData();
      }

      showToast.success("Category created successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to create category", set);
      throw e;
    }
  },

  updateCategory: async (categoryId, updatedData) => {
    const { categories, currentUserUid } = get();

    set({ error: null });

    try {
      const existing = categories.find((c) => c.id === categoryId);
      if (!existing) {
        throwErrorWithToast("Category not found");
      }

      const trimmed = trimStrings(updatedData);

      if (!validateCategoryUniqueness(categories, trimmed.name, categoryId)) {
        throwErrorWithToast("Category name must be unique");
      }

      const updateData = createUpdateData(
        { ...existing, ...trimmed },
        currentUserUid,
      );

      validateCategory(updateData);
      await updateCategoryService(categoryId, updateData);

      // Update local state
      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === categoryId
            ? { ...c, ...trimmed, updated_at: new Date() }
            : c,
        ),
        categoriesWithDeleted: state.categoriesWithDeleted.map((c) =>
          c.id === categoryId
            ? { ...c, ...trimmed, updated_at: new Date() }
            : c,
        ),
      }));

      // Trigger cross-store update
      const transactionStore = useTransactionStore.getState();
      if (
        transactionStore.currentUserUid === currentUserUid &&
        transactionStore.transactions.length > 0
      ) {
        transactionStore.refreshTransactionData();
      }

      showToast.success("Category updated successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to update category", set);
      throw e;
    }
  },

  deleteCategory: async (categoryId) => {
    const { categories, currentUserUid } = get();

    set({ error: null });

    try {
      const existing = categories.find((c) => c.id === categoryId);
      if (!existing) {
        throwErrorWithToast("Category not found");
      }

      await deleteCategoryService(categoryId);

      set((state) => ({
        categories: state.categories.filter((c) => c.id !== categoryId),
      }));

      // Reload categories to update categoriesWithDeleted (showing soft deleted)
      await get().getCategories(currentUserUid);

      showToast.success("Category deleted successfully!");
    } catch (e) {
      handleStoreError(e, "Failed to delete category", set);
      throw e;
    }
  },

  reset: () => {
    set({
      categories: [],
      categoriesWithDeleted: [],
      loading: false,
      error: null,
    });
  },
});
