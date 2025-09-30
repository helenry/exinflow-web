// stores/transaction/transactionValidation.js
import { validateTransactionByType } from "../../models/transactionSchema";

export const validateTransaction = (transaction) => {
  return validateTransactionByType(transaction);
};
