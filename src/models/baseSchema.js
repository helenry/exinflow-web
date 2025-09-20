// models/baseSchema.js
import { z } from "zod";
import { TRANSACTION_TYPES } from "@/constants";

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
  transactionType: z
    .string()
    .refine((val) => Object.values(TRANSACTION_TYPES).includes(val), {
      message: "Invalid transaction type",
    }),
  hexColor: z.string().regex(/^([0-9a-fA-F]{6})$/, "Invalid hex color code"),
  currencyCode: z.string().length(3, "Currency Code must be exactly 3 characters"),
  nonNegativeAmount: z.number().nonnegative(),
  positiveAmount: z.number().positive("Amount must be greater than 0"),
  walletId: z.string().min(1, "Wallet ID cannot be empty"),
  categoryId: z.string().min(1, "Category ID cannot be empty").nullable(),
  subcategoryId: z.string().min(1, "Subcategory ID cannot be empty").nullable(),
  optionalString: z.string().nullable(),
  timestamp: z.instanceof(Date).or(z.any()),
};