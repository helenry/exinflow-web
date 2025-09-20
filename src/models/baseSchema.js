// models/baseSchema.js
import { z } from "zod";

// Common fields that all entities share
export const baseEntitySchema = z.object({
  user_uid: z.string().min(1),
  created_at: z.instanceof(Date).or(z.any()),
  created_by: z.string().min(1),
  updated_at: z.instanceof(Date).nullable(),
  updated_by: z
    .string()
    .nullable()
    .refine((val) => val === null || val.trim() !== "", {
      message: "updated_by cannot be empty string",
    }),
  is_deleted: z.boolean(),
});

// Common validation patterns
export const validationPatterns = {
  name: z.string().min(1),
  icon: z.string().min(1, { message: "Icon cannot be empty" }),
  hexColor: z.string().regex(/^([0-9a-fA-F]{6})$/, "Invalid hex color code"),
  currencyCode: z.string().length(3, "Currency Code must be exactly 3 characters"),
  nonNegativeAmount: z.number().nonnegative(),
};