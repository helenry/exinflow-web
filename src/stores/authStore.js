// stores/authStore.js
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";
import { signInWithGoogle as firebaseSignIn } from "../services/authService";
import useUserConfigStore from "./userConfigStore";

const useAuthStore = create(
  subscribeWithSelector((set, get) => ({
    currentUser: null,
    isAuthenticated: false,
    isLoading: true,
    authError: null,

    setCurrentUser: (user) =>
      set({
        currentUser: user,
        isAuthenticated: !!user,
        authError: null,
      }),

    setLoading: (loading) => set({ isLoading: loading }),

    setAuthError: (error) => set({ authError: error }),

    signInWithGoogle: async () => {
      try {
        set({ authError: null, isLoading: true });
        const user = await firebaseSignIn();
        // User state will be handled by auth listener
        return user;
      } catch (error) {
        set({ authError: error.message, isLoading: false });
        throw error;
      }
    },

    signOut: async () => {
      try {
        await auth.signOut();
        set({
          currentUser: null,
          isAuthenticated: false,
          authError: null,
        });
        useUserConfigStore.getState().clearUserConfig();
      } catch (error) {
        set({ authError: error.message });
        throw error;
      }
    },

    initializeAuth: () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        set({ currentUser: user, isAuthenticated: !!user, isLoading: false });

        if (user) {
          try {
            useUserConfigStore.getState().getUserConfig(user.uid);
          } catch (error) {
            // Error handled in userConfigStore
          }
        } else {
          useUserConfigStore.getState().clearUserConfig();
        }
      });

      return unsubscribe;
    },
  })),
);

export default useAuthStore;
