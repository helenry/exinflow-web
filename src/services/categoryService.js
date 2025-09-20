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
import { DEFAULT_CATEGORIES, DEFAULT_CREATOR } from "@/constants";
import { createSubcategoryService } from "./subcategoryService";

export const getCategoriesService = async (userUid) => {
  try {
    // 1. Get all categories for the user
    const categoriesSnapshot = await getDocs(
      query(
        collection(db, "categories"),
        where("is_deleted", "==", false),
        where("user_uid", "==", userUid)
      )
    );

    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 2. For each category, fetch only subcategories that are not deleted
    const categoriesWithSubs = await Promise.all(
      categories.map(async (category) => {
        const subcategoriesSnapshot = await getDocs(
          query(
            collection(db, "categories", category.id, "subcategories"),
            where("is_deleted", "==", false)
          )
        );

        const subcategories = subcategoriesSnapshot.docs.map((subDoc) => ({
          id: subDoc.id,
          ...subDoc.data(),
        }));

        return {
          ...category,
          subcategories, // empty array if none
        };
      })
    );

    return categoriesWithSubs;
  } catch (error) {
    console.error("Error fetching categories with subcategories:", error);
    throw error;
  }
};

export const createCategoryService = async (newCategory) =>
  await addDoc(collection(db, "categories"), newCategory);

export const updateCategoryService = async (categoryId, updateData) =>
  await updateDoc(doc(db, "categories", categoryId), updateData);

export const deleteCategoryService = async (categoryId) =>
  await updateDoc(doc(db, "categories", categoryId), { is_deleted: true });

export const createStarterCategoriesService = async (userId) => {
  const categoriesRef = collection(db, "categories");
  const q = query(
    categoriesRef,
    where("user_uid", "==", userId),
    where("is_deleted", "==", false)
  );
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    for (const category of DEFAULT_CATEGORIES) {
      // Create category document using the service
      const categoryData = {
        name: category.name,
        type: category.type,
        icon: category.icon,
        user_uid: userId,
        created_at: serverTimestamp(),
        created_by: DEFAULT_CREATOR,
        updated_at: null,
        updated_by: null,
        is_deleted: false,
      };
      
      const categoryDocRef = await createCategoryService(categoryData);
      console.log(`Category "${category.name}" created`);
      
      // Create subcategories using the subcategory service
      if (category.subcategories && category.subcategories.length > 0) {
        for (const sub of category.subcategories) {
          const subcategoryData = {
            name: sub.name,
            icon: sub.icon,
            created_at: serverTimestamp(),
            created_by: DEFAULT_CREATOR,
            updated_at: null,
            updated_by: null,
            is_deleted: false,
          };
          
          await createSubcategoryService(categoryDocRef.id, subcategoryData);
          console.log(
            `Subcategory "${sub.name}" created under "${category.name}"`
          );
        }
      }
    }
  } else {
    console.log("Categories already exist for this user");
  }
};