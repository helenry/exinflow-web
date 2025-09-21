// stores/category/subcategory/subcategoryValidation.js
import { subcategorySchema } from "../../../models/subcategorySchema";

export const validateSubcategory = (subcategory) => {
  return subcategorySchema.parse(subcategory);
};

export const validateSubcategoryUniqueness = (
  subcategories,
  name,
  excludeId = null,
) => {
  const trimmedName = name?.trim().toLowerCase();
  if (!trimmedName) return false;

  return !subcategories.some((subcategory) => {
    const subcategoryName = subcategory.name?.trim().toLowerCase();
    return subcategoryName === trimmedName && subcategory.id !== excludeId;
  });
};
