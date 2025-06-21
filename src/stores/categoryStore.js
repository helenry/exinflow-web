// stores/categoryStore.js
import { create } from "zustand";
import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/categoryService";
import { categorySchema } from "../models/categorySchema";
import { trimStrings } from "../utils/format";
import { convertFirestoreTimestamps } from "../utils/type";
import { validateUniqueName } from "../utils/validation";
import { z } from "zod";
import { serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const validateCategory = (category) => categorySchema.parse(category);

const useCategoryStore = create((set, get) => ({
  // State
  categories: [],
  loading: false,
  error: null,
  currentUserUid: null,

  // Actions
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

      set({ categories: categoryList, loading: false });
    } catch (e) {
      console.error(e);
      set({ error: "Failed to load categories", loading: false });
    }
  },

  createCategory: async (categoryData) => {
    const { categories, currentUserUid } = get();

    set({ error: null });
    let errorMessage;

    try {
      const trimmed = trimStrings(categoryData);
      if (!validateUniqueName(categories, trimmed.name)) {
        errorMessage = "Category name must be unique";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const newCategory = {
        ...trimmed,
        amount: 0,
        user_uid: currentUserUid,
        is_deleted: false,
        created_at: serverTimestamp(),
        created_by: currentUserUid,
        updated_at: null,
        updated_by: null,
      };

      validateCategory({ ...newCategory, created_at: new Date() }); // zod doesn't like serverTimestamp

      const docRef = await createCategoryService(newCategory);

      set((state) => ({
        categories: [
          ...state.categories,
          { id: docRef.id, ...newCategory, created_at: new Date() },
        ],
      }));

      toast.success("Category created successfully!");
    } catch (e) {
      console.error(e);
      errorMessage =
        e instanceof z.ZodError
          ? "Validation error: " + e.errors.map((err) => err.message).join(", ")
          : e.message || "Failed to create category";
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw e; // Re-throw to allow component to handle if needed
    }
  },

  updateCategory: async (categoryId, updatedData) => {
    const { categories, currentUserUid } = get();

    set({ error: null });
    let errorMessage;

    try {
      const existing = categories.find((w) => w.id === categoryId);
      if (!existing) {
        errorMessage = "Category not found";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const trimmed = trimStrings(updatedData);
      if (!validateUniqueName(categories, trimmed.name, categoryId)) {
        errorMessage = "Category name must be unique";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const merged = {
        ...existing,
        ...trimmed,
        updated_at: new Date(),
        updated_by: currentUserUid,
      };

      validateCategory(merged);

      await updateCategoryService(categoryId, {
        ...trimmed,
        updated_at: serverTimestamp(),
        updated_by: currentUserUid,
      });

      set((state) => ({
        categories: state.categories.map((w) =>
          w.id === categoryId ? { ...w, ...trimmed, updated_at: new Date() } : w,
        ),
      }));

      toast.success("Category updated successfully!");
    } catch (e) {
      console.error(e);
      errorMessage =
        e instanceof z.ZodError
          ? "Validation error: " + e.errors.map((err) => err.message).join(", ")
          : e.message || "Failed to update category";
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw e; // Re-throw to allow component to handle if needed
    }
  },

  deleteCategory: async (categoryId) => {
    set({ error: null });

    try {
      await deleteCategoryService(categoryId);
      set((state) => ({
        categories: state.categories.filter((w) => w.id !== categoryId),
      }));
      toast.success("Category deleted successfully!");
    } catch (e) {
      console.error(e);
      const errorMessage = "Failed to delete category";
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw e; // Re-throw to allow component to handle if needed
    }
  },

  reset: () => {
    set({
      categories: [],
      loading: false,
      error: null,
    });
  },

  // Computed values (selectors)
  getCategoryById: (categoryId) => {
    const { categories } = get();
    return categories.find((w) => w.id === categoryId);
  },

  getCategoriesByUser: (userUid) => {
    const { categories } = get();
    return categories.filter((w) => w.user_uid === userUid);
  },
}));

export default useCategoryStore;
