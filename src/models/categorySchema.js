// models/categorySchema.js
import { z } from "zod";
import { TRANSACTION_TYPES } from "@/constants";
import { baseEntitySchema, validationPatterns } from "./baseSchema";

export const categorySchema = baseEntitySchema.extend({
  type: validationPatterns.transactionType,
  name: validationPatterns.name,
  icon: validationPatterns.icon,
  color: validationPatterns.hexColor,
});
