// stores/userConfig/userConfigActions.js
import {
  getUserConfigService,
  updateUserConfigService,
  createEmptyUserConfigService,
} from "../../services/userConfigService";

export const userConfigActions = (set, get) => ({
  getUserConfig: async (uid) => {
    if (!uid) return;

    try {
      set({ configLoading: true, configError: null });

      const config = await getUserConfigService(uid);

      // Handle case where no config exists yet
      if (!config) {
        await createEmptyUserConfigService(uid);
        const newConfig = await getUserConfigService(uid);
        set({ userConfig: newConfig, configLoading: false });
        return newConfig;
      }

      set({ userConfig: config, configLoading: false });
      return config;
    } catch (error) {
      set({ configError: error.message, configLoading: false });
      throw error;
    }
  },

  updateUserConfig: async (uid, updates) => {
    if (!uid) return;

    try {
      set({ configLoading: true, configError: null });

      // Update in Firebase
      await updateUserConfigService(uid, updates);

      // Update local state
      set((state) => ({
        userConfig: { ...state.userConfig, ...updates },
        configLoading: false,
      }));

      return get().userConfig;
    } catch (error) {
      set({ configError: error.message, configLoading: false });
      throw error;
    }
  },

  clearUserConfig: () => {
    set({
      userConfig: null,
      configError: null,
    });
  },
});
