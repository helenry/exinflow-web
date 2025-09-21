// models/transactionSchema.js
import { z } from "zod";
import { baseEntitySchema, validationPatterns } from "./baseSchema";
import { TRANSACTION_TYPES } from "@/constants";

// Type-specific schema creators for better developer experience
export const createIncomeTransactionSchema = () =>
  baseEntitySchema
    .extend({
      type: z.literal(TRANSACTION_TYPES.INCOME),
      amount: validationPatterns.positiveAmount,
      date: validationPatterns.timestamp,
      wallet_id: validationPatterns.walletId,
      category_id: validationPatterns.categoryId.optional(),
      subcategory_id: validationPatterns.subcategoryId.optional(),
      note: validationPatterns.optionalString,
    })
    .refine((data) => !data.subcategory_id || data.category_id, {
      message: "category_id is required when subcategory_id is provided",
      path: ["category_id"],
    });

export const createExpenseTransactionSchema = () =>
  baseEntitySchema
    .extend({
      type: z.literal(TRANSACTION_TYPES.EXPENSE),
      amount: validationPatterns.positiveAmount,
      date: validationPatterns.timestamp,
      wallet_id: validationPatterns.walletId,
      category_id: validationPatterns.categoryId.optional(),
      subcategory_id: validationPatterns.subcategoryId.optional(),
      note: validationPatterns.optionalString,
    })
    .refine((data) => !data.subcategory_id || data.category_id, {
      message: "category_id is required when subcategory_id is provided",
      path: ["category_id"],
    });

export const createTransferTransactionSchema = () =>
  baseEntitySchema
    .extend({
      type: z.literal(TRANSACTION_TYPES.TRANSFER),
      amount: validationPatterns.positiveAmount,
      date: validationPatterns.timestamp,
      source_wallet_id: validationPatterns.walletId,
      destination_wallet_id: validationPatterns.walletId,
      note: validationPatterns.optionalString,
    })
    .refine((data) => data.source_wallet_id !== data.destination_wallet_id, {
      message: "Source and destination wallets must be different",
      path: ["destination_wallet_id"],
    });

// Helper function to validate based on transaction type
export const validateTransactionByType = (transactionData) => {
  switch (transactionData.type) {
    case TRANSACTION_TYPES.INCOME:
      return createIncomeTransactionSchema().parse(transactionData);
    case TRANSACTION_TYPES.EXPENSE:
      return createExpenseTransactionSchema().parse(transactionData);
    case TRANSACTION_TYPES.TRANSFER:
      return createTransferTransactionSchema().parse(transactionData);
  }
};
