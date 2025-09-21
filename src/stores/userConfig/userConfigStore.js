// stores/userConfig/userConfigStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userConfigActions } from "./userConfigActions";

const useUserConfigStore = create(
  persist(
    (set, get) => ({
      // State
      userConfig: null,
      configLoading: false,
      configError: null,

      // Actions
      ...userConfigActions(set, get),
    }),
    {
      name: "user-config-storage",
      partialize: (state) => ({
        userConfig: state.userConfig,
      }),
    },
  ),
);

export default useUserConfigStore;
