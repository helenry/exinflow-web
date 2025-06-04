// services/authService.js
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../api/firebase";
import { createStarterWalletService } from "./walletService";
import { createStarterCategoriesService } from "./categoryService";
import { createEmptyUserConfigService } from "./userConfigService";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userId = user.uid;

    await createEmptyUserConfigService(userId);
    await createStarterWalletService(userId);
    await createStarterCategoriesService(userId);

    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
