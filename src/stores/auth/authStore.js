// stores/auth/authStore.js
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { authActions } from "./authActions";

const useAuthStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    currentUser: null,
    isAuthenticated: false,
    isLoading: true,
    authError: null,

    // Actions
    ...authActions(set, get),
  })),
);

export default useAuthStore;
