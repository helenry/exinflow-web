// stores/category/categoryStore.js
// This file defines the main Zustand store for categories.
// It acts as a central hub, combining the state, actions, and selectors
// from separate files to create a single, cohesive store.
// This modular approach keeps the main store file clean and easy to read.

import { create } from "zustand";
import { categoryActions } from "./categoryActions"; // Imports the object containing all action functions (e.g., createCategory, deleteCategory).
import { categorySelectors } from "./categorySelector"; // Imports the object containing all selector functions (e.g., getCategoryById).

// Create the Zustand store instance.
const useCategoryStore = create((set, get) => ({
  // State
  // These are the core data properties managed by the store.
  categories: [], // An array to hold the category data.
  loading: false, // A boolean to track if data is being fetched.
  error: null, // A string to store any error messages.
  currentUserUid: null, // A string to hold the ID of the current authenticated user.

  // Actions
  // This line spreads the action functions from categoryActions.js into the store.
  // This allows the store to have methods like `createCategory`, `updateCategory`, etc.
  ...categoryActions(set, get),
  
  // Selectors
  // This line spreads the selector functions from categorySelectors.js into the store.
  // These are functions that retrieve specific parts of the state.
  ...categorySelectors(get),
}));

export default useCategoryStore;
