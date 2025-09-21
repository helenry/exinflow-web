// models/walletSchema.js
import { baseEntitySchema, validationPatterns } from "./baseSchema";

export const walletSchema = baseEntitySchema.extend({
  name: validationPatterns.name,
  base_amount: validationPatterns.nonNegativeAmount,
  amount: validationPatterns.nonNegativeAmount,
  currency_code: validationPatterns.currencyCode,
  color: validationPatterns.hexColor,
});
