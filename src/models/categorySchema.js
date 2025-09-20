// models/categorySchema.js
import { z } from "zod";
import { TRANSACTION_TYPES } from "@/constants";
import { baseEntitySchema, validationPatterns } from "./baseSchema";

export const categorySchema = baseEntitySchema.extend({
  type: z
    .string()
    .refine((val) => Object.values(TRANSACTION_TYPES).includes(val), {
      message: "Invalid transaction type",
    }),
  name: validationPatterns.name,
  icon: validationPatterns.icon,
  color: validationPatterns.hexColor,
});