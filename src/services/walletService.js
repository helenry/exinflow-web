// services/walletService.js
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { DEFAULT_CREATOR, DEFAULT_WALLET } from "@/constants";

export const getWalletsService = async (userUid) => {
  const q = query(
    collection(db, "wallets"),
    where("is_deleted", "==", false),
    where("user_uid", "==", userUid),
    orderBy("created_at", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createWalletService = async (newWallet) =>
  await addDoc(collection(db, "wallets"), newWallet);

export const updateWalletService = async (walletId, updateData) =>
  await updateDoc(doc(db, "wallets", walletId), updateData);

export const deleteWalletService = async (walletId) =>
  await updateDoc(doc(db, "wallets", walletId), { is_deleted: true });

export const createStarterWalletService = async (userId) => {
  const walletsRef = collection(db, "wallets");
  const q = query(
    walletsRef,
    where("user_uid", "==", userId),
    where("is_deleted", "==", false),
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    await addDoc(walletsRef, {
      ...DEFAULT_WALLET,
      currency_code: "IDR",
      user_uid: userId,
      created_at: serverTimestamp(),
      created_by: DEFAULT_CREATOR,
      updated_at: null,
      updated_by: null,
      is_deleted: false,
    });
    console.log("Default wallet created");
  } else {
    console.log("Wallet already exists");
  }
};
