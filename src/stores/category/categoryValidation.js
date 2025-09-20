// stores/category/categoryValidation.js
import { categorySchema } from "../../models/categorySchema";

export const validateCategory = (category) => {
  return categorySchema.parse(category);
};

export const validateCategoryUniqueness = (categories, name, excludeId = null) => {
  const trimmedName = name?.trim().toLowerCase();
  if (!trimmedName) return false;
  
  return !categories.some((category) => {
    const categoryName = category.name?.trim().toLowerCase();
    return categoryName === trimmedName && category.id !== excludeId;
  });
};