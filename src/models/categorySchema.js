// models/categorySchema.js
import { z } from "zod";
import { TRANSACTION_TYPES } from "../constants/types";

export const categorySchema = z.object({
  name: z.string().min(1),
  type: z
    .number()
    .refine((val) => Object.values(TRANSACTION_TYPES).includes(val), {
      message: "Invalid transaction type",
    }),
  icon: z.string().min(1, { message: "icon cannot be empty" }),
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

export const subcategorySchema = z.object({
  category_id: z.string().min(1),
  name: z.string().min(1),
  icon: z.string().min(1, { message: "icon cannot be empty" }),
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
