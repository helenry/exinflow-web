// models/userConfigSchema.js
import { z } from "zod";
import { validationPatterns } from "./baseSchema";

export const userConfigSchema = z.object({
  main_currency_code: validationPatterns.currencyCode.nullable(),
  used_currency_codes: z.array(validationPatterns.currencyCode),
});
