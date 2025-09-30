// utils/store/storeData.js
import { serverTimestamp } from "firebase/firestore";

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
