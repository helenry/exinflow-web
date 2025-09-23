// constants/options/transactionTypeOptions.js
import { TRANSACTION_TYPES, TRANSACTION_LABELS } from "../types";

export const TRANSACTION_TYPE_OPTIONS = Object.freeze([
  { 
    label: TRANSACTION_LABELS[TRANSACTION_TYPES.EXPENSE], 
    value: TRANSACTION_TYPES.EXPENSE, 
    color: "bg-red-500" 
  },
  { 
    label: TRANSACTION_LABELS[TRANSACTION_TYPES.INCOME], 
    value: TRANSACTION_TYPES.INCOME, 
    color: "bg-green-500" 
  },
  { 
    label: TRANSACTION_LABELS[TRANSACTION_TYPES.TRANSFER], 
    value: TRANSACTION_TYPES.TRANSFER, 
    color: "bg-blue-500" 
  },
]);

export const CATEGORY_TYPE_OPTIONS = TRANSACTION_TYPE_OPTIONS.filter(
  (opt) => opt.value !== TRANSACTION_TYPES.TRANSFER
);