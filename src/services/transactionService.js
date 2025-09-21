// services/walletService.js
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../api/firebase";

export const getTransactionsService = async (userUid) => {
  const q = query(
    collection(db, "transactions"),
    where("is_deleted", "==", false),
    where("user_uid", "==", userUid),
    orderBy("date", "desc"),
    orderBy("created_at", "desc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createTransactionService = async (newTransaction) =>
  await addDoc(collection(db, "transactions"), newTransaction);

export const updateTransactionService = async (walletId, updateData) =>
  await updateDoc(doc(db, "transactions", walletId), updateData);

export const deleteTransactionService = async (walletId) =>
  await updateDoc(doc(db, "transactions", walletId), { is_deleted: true });
