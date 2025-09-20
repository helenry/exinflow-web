// models/subcategorySchema.js
import { baseEntitySchema, validationPatterns } from "./baseSchema";

export const subcategorySchema = baseEntitySchema.extend({
  name: validationPatterns.name,
  icon: validationPatterns.icon,
});