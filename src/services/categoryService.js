// services/categoryService.js
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { DEFAULT_CATEGORIES, DEFAULT_CREATOR } from "../constants/defaults";

export const getCategoriesService = async (userUid) => {
  const q = query(
    collection(db, "categories"),
    where("is_deleted", "==", false),
    where("user_uid", "==", userUid),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createCategoryService = async (newCategory) =>
  await addDoc(collection(db, "categories"), newCategory);

export const updateCategoryService = async (categoryId, updateData) =>
  await updateDoc(doc(db, "categories", categoryId), updateData);

export const deleteCategoryService = async (categoryId) =>
  await updateDoc(doc(db, "categories", categoryId), { is_deleted: true });

export const createStarterCategoriesService = async (userId) => {
  const categoriesRef = collection(db, "categories");
  const subcategoriesRef = collection(db, "subcategories");

  const q = query(
    categoriesRef,
    where("user_uid", "==", userId),
    where("is_deleted", "==", false),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    for (const category of DEFAULT_CATEGORIES) {
      const categoryDocRef = await addDoc(categoriesRef, {
        name: category.name,
        type: category.type,
        icon: category.icon,
        user_uid: userId,
        created_at: serverTimestamp(),
        created_by: DEFAULT_CREATOR,
        updated_at: null,
        updated_by: null,
        is_deleted: false,
      });

      console.log(`Category "${category.name}" created`);

      // Create subcategories
      if (category.subcategories && category.subcategories.length > 0) {
        for (const sub of category.subcategories) {
          await addDoc(subcategoriesRef, {
            category_id: categoryDocRef.id,
            name: sub.name,
            icon: sub.icon,
            created_at: serverTimestamp(),
            created_by: DEFAULT_CREATOR,
            updated_at: null,
            updated_by: null,
            is_deleted: false,
          });
          console.log(
            `Subcategory "${sub.name}" created under "${category.name}"`,
          );
        }
      }
    }
  } else {
    console.log("Categories already exist for this user");
  }
};
