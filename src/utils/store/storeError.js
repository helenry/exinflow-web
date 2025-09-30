// utils/store/storeError.js
import { z } from "zod";
import { showToast } from "../toast";

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
