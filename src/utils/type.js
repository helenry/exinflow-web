// utils/type.js
import { Timestamp } from "firebase/firestore";

// Helper to convert Firestore timestamps to JS Date
export const convertFirestoreTimestamps = (wallet) => ({
  ...wallet,
  created_at:
    wallet.created_at instanceof Timestamp
      ? wallet.created_at.toDate()
      : wallet.created_at,
  updated_at:
    wallet.updated_at instanceof Timestamp
      ? wallet.updated_at.toDate()
      : wallet.updated_at,
});

export const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};