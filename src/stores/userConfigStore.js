// stores/userConfigStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserConfigService } from '../services/userConfigService';

const useUserConfigStore = create(
  persist(
    (set) => ({
      userConfig: null,
      configLoading: false,
      configError: null,

      getUserConfig: async (uid) => {
        if (!uid) return;
        try {
          set({ configLoading: true, configError: null });
          const config = await getUserConfigService(uid);
          set({ userConfig: config, configLoading: false });
          return config;
        } catch (error) {
          set({ configError: error.message, configLoading: false });
          throw error;
        }
      },

      updateUserConfig: (updates) =>
        set((state) => ({
          userConfig: { ...state.userConfig, ...updates },
        })),

      clearUserConfig: () =>
        set({
          userConfig: null,
          configError: null,
        }),
    }),
    {
      name: 'user-config-storage',
      partialize: (state) => ({
        userConfig: state.userConfig,
      }),
    }
  )
);

export default useUserConfigStore;
