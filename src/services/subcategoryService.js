// services/subcategoryService.js
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../api/firebase";

export const createSubcategoryService = async (categoryId, newSubcategory) => {
  const subcategoriesRef = collection(
    db,
    "categories",
    categoryId,
    "subcategories",
  );
  return await addDoc(subcategoriesRef, newSubcategory);
};

export const updateSubcategoryService = async (
  categoryId,
  subcategoryId,
  updateData,
) => {
  const subcategoryRef = doc(
    db,
    "categories",
    categoryId,
    "subcategories",
    subcategoryId,
  );
  return await updateDoc(subcategoryRef, updateData);
};

export const deleteSubcategoryService = async (categoryId, subcategoryId) => {
  const subcategoryRef = doc(
    db,
    "categories",
    categoryId,
    "subcategories",
    subcategoryId,
  );
  return await updateDoc(subcategoryRef, { is_deleted: true });
};
