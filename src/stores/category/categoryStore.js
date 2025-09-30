// stores/category/categoryStore.js
import { create } from "zustand";
import { categoryActions } from "./categoryActions";
import { subcategoryActions } from "./subcategory/subcategoryActions";

const useCategoryStore = create((set, get) => ({
  // State
  categories: [],
  categoriesWithDeleted: [],
  loading: false,
  error: null,
  currentUserUid: null,

  // Category Actions
  ...categoryActions(set, get),

  // Subcategory Actions
  ...subcategoryActions(set, get),
}));

export default useCategoryStore;
