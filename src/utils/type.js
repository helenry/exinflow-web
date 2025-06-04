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
