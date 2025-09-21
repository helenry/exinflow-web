// pages/Transactions.jsx
import React, { useEffect } from "react";
import Title from "@/components/ui/texts/Title";
import useTransactionStore from "../stores/transaction/transactionStore";
import useAuthStore from "../stores/auth/authStore";
import { useModifyHandler } from "../hooks/useModifyHandler";

const Transactions = () => {
  const { currentUser } = useAuthStore();
  const { transactions, deleteTransaction, setCurrentUser, loading, error } =
    useTransactionStore();

  const { handleCreate, handleEdit, handleDelete } = useModifyHandler(
    "transaction",
    deleteTransaction,
  );

  useEffect(() => {
    setCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCurrentUser]);

  console.log("transactions");
  console.log(transactions);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title>Transactions</Title>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          + New Transaction
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">helo</div>
    </div>
  );
};

export default Transactions;
