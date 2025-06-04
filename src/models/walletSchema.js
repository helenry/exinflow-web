// models/walletSchema.js
import { z } from 'zod';

export const walletSchema = z.object({
  name: z.string().min(1),
  base_amount: z.number().nonnegative(),
  amount: z.number().nonnegative(),
  color: z.string().regex(/^([0-9a-fA-F]{6})$/, 'Invalid hex color code'),
  currency_code: z
    .string()
    .length(3, 'currency_code must be exactly 3 characters'),
  user_uid: z.string().min(1),
  created_at: z.instanceof(Date).or(z.any()),
  created_by: z.string().min(1),
  updated_at: z.instanceof(Date).nullable(),
  updated_by: z
    .string()
    .nullable()
    .refine(val => val === null || val.trim() !== '', {
      message: 'updated_by cannot be empty string',
    }),
  is_deleted: z.boolean(),
});
