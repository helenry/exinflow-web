// utils/storeHelpers.js
import { z } from "zod";
import { serverTimestamp } from "firebase/firestore";
import { showToast } from "./toast";

export const throwErrorWithToast = (message) => {
  showToast.error(message);
  throw new Error(message);
};

// Helper function to handle common error processing
export const handleStoreError = (e, defaultMessage, set) => {
  console.error(e);
  const errorMessage =
    e instanceof z.ZodError
      ? "Validation error: " + e.errors.map((err) => err.message).join(", ")
      : e.message || defaultMessage;
  set({ error: errorMessage });
  showToast.error(errorMessage);
  return errorMessage;
};

// Helper function to create base entity data
export const createBaseData = (data, currentUserUid) => ({
  ...data,
  user_uid: currentUserUid,
  is_deleted: false,
  created_at: serverTimestamp(),
  created_by: currentUserUid,
  updated_at: null,
  updated_by: null,
});

// Helper function to create update data
export const createUpdateData = (data, currentUserUid) => ({
  ...data,
  updated_at: new Date(),
  updated_by: currentUserUid,
});
