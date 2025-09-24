// models/transactionSchema.js
import { z } from "zod";
import { baseEntitySchema, validationPatterns } from "./baseSchema";
import { TRANSACTION_TYPES } from "@/constants";

// Base transaction fields shared across all types
const baseTransactionFields = {
  amount: validationPatterns.positiveAmount,
  date: validationPatterns.timestamp,
  note: validationPatterns.optionalString,
};

// Fields for income and expense transactions
const categoryFields = {
  category_id: validationPatterns.categoryId.optional(),
  subcategory_id: validationPatterns.subcategoryId.optional(),
};

// Validation rule for category/subcategory relationship
const categorySubcategoryRefine = (data) => ({
  condition: !data.subcategory_id || data.category_id,
  message: "category_id is required when subcategory_id is provided",
  path: ["category_id"],
});

// Schema factory for creating transaction schemas
const createTransactionSchema = (
  baseSchema,
  type,
  specificFields,
  refineRules = [],
) => {
  let schema = baseSchema.extend({
    type: z.literal(type),
    ...baseTransactionFields,
    ...specificFields,
  });

  // Apply refinement rules
  refineRules.forEach((rule) => {
    const refineConfig = typeof rule === "function" ? rule({}) : rule;
    schema = schema.refine((data) => refineConfig.condition, {
      message: refineConfig.message,
      path: refineConfig.path,
    });
  });

  return schema;
};

// Transaction type configurations
const transactionConfigs = {
  [TRANSACTION_TYPES.INCOME]: {
    fields: {
      wallet_id: validationPatterns.walletId,
      ...categoryFields,
    },
    refineRules: [categorySubcategoryRefine],
  },
  [TRANSACTION_TYPES.EXPENSE]: {
    fields: {
      wallet_id: validationPatterns.walletId,
      ...categoryFields,
    },
    refineRules: [categorySubcategoryRefine],
  },
  [TRANSACTION_TYPES.TRANSFER]: {
    fields: {
      source_wallet_id: validationPatterns.walletId,
      destination_wallet_id: validationPatterns.walletId,
    },
    refineRules: [
      (data) => ({
        condition: data.source_wallet_id === data.destination_wallet_id,
        message: "Source and destination wallets must be different",
        path: ["destination_wallet_id"],
      }),
    ],
  },
};

// Entity schema creators (with base entity fields)
export const createIncomeTransactionSchema = () =>
  createTransactionSchema(
    baseEntitySchema,
    TRANSACTION_TYPES.INCOME,
    transactionConfigs[TRANSACTION_TYPES.INCOME].fields,
    transactionConfigs[TRANSACTION_TYPES.INCOME].refineRules,
  );

export const createExpenseTransactionSchema = () =>
  createTransactionSchema(
    baseEntitySchema,
    TRANSACTION_TYPES.EXPENSE,
    transactionConfigs[TRANSACTION_TYPES.EXPENSE].fields,
    transactionConfigs[TRANSACTION_TYPES.EXPENSE].refineRules,
  );

export const createTransferTransactionSchema = () =>
  createTransactionSchema(
    baseEntitySchema,
    TRANSACTION_TYPES.TRANSFER,
    transactionConfigs[TRANSACTION_TYPES.TRANSFER].fields,
    transactionConfigs[TRANSACTION_TYPES.TRANSFER].refineRules,
  );

// Form schema creators (without base entity fields)
export const createIncomeFormSchema = () =>
  createTransactionSchema(
    z.object({}),
    TRANSACTION_TYPES.INCOME,
    transactionConfigs[TRANSACTION_TYPES.INCOME].fields,
    transactionConfigs[TRANSACTION_TYPES.INCOME].refineRules,
  );

export const createExpenseFormSchema = () =>
  createTransactionSchema(
    z.object({}),
    TRANSACTION_TYPES.EXPENSE,
    transactionConfigs[TRANSACTION_TYPES.EXPENSE].fields,
    transactionConfigs[TRANSACTION_TYPES.EXPENSE].refineRules,
  );

export const createTransferFormSchema = () =>
  createTransactionSchema(
    z.object({}),
    TRANSACTION_TYPES.TRANSFER,
    transactionConfigs[TRANSACTION_TYPES.TRANSFER].fields,
    transactionConfigs[TRANSACTION_TYPES.TRANSFER].refineRules,
  );

// Generic validator that works with both entity and form schemas
export const validateTransactionByType = (
  transactionData,
  useEntitySchema = false,
) => {
  const schemaCreators = useEntitySchema
    ? {
        [TRANSACTION_TYPES.INCOME]: createIncomeTransactionSchema,
        [TRANSACTION_TYPES.EXPENSE]: createExpenseTransactionSchema,
        [TRANSACTION_TYPES.TRANSFER]: createTransferTransactionSchema,
      }
    : {
        [TRANSACTION_TYPES.INCOME]: createIncomeFormSchema,
        [TRANSACTION_TYPES.EXPENSE]: createExpenseFormSchema,
        [TRANSACTION_TYPES.TRANSFER]: createTransferFormSchema,
      };

  const schemaCreator = schemaCreators[transactionData.type];
  if (!schemaCreator) {
    throw new Error(`Unknown transaction type: ${transactionData.type}`);
  }

  return schemaCreator().parse(transactionData);
};
