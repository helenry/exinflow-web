import { z } from "zod";

export const subcategorySchema = z.object({
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