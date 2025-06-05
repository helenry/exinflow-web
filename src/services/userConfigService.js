// services/userConfigService.js
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";

export const getUserConfigService = async (userId) => {
  const docRef = doc(db, "user_config", userId);
  const snapshot = await getDoc(docRef);
  return snapshot.data();
};

export const updateUserConfigService = async (userId, updateData) =>
  await updateDoc(doc(db, "user_config", userId), updateData);

export const createEmptyUserConfigService = async (userId) => {
  const userConfigRef = doc(db, "user_config", userId);
  const docSnap = await getDoc(userConfigRef);

  if (docSnap.exists()) {
    console.log("User config already exists");
    return;
  }

  await setDoc(userConfigRef, {
    main_currency_code: null,
    used_currency_codes: null,
  });

  console.log("Default user config created");
};
