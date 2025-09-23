// constants/types.js
export const TRANSACTION_TYPES = Object.freeze({
  EXPENSE: "expense",
  INCOME: "income",
  TRANSFER: "transfer",
});

export const TRANSACTION_LABELS = Object.freeze({
  [TRANSACTION_TYPES.EXPENSE]: "Expense",
  [TRANSACTION_TYPES.INCOME]: "Income", 
  [TRANSACTION_TYPES.TRANSFER]: "Transfer",
});