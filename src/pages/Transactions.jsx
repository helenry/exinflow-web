// pages/Transactions.jsx
import { useEffect } from "react";
import Title from "@/components/ui/texts/Title";
import useTransactionStore from "../stores/transaction/transactionStore";
import useAuthStore from "../stores/auth/authStore";
import { useModifyHandler } from "../hooks/useModifyHandler";
import TransactionTable from "../components/menu/transaction/TransactionTable";
import useCategoryStore from "../stores/category/categoryStore";
import useWalletStore from "../stores/wallet/walletStore";

const Transactions = () => {
  const { currentUser } = useAuthStore();
  const {
    transactions,
    deleteTransaction,
    setCurrentUser,
    refreshTransactionData,
    loading,
    error,
  } = useTransactionStore();
  const wallets = useWalletStore((state) => state.walletsWithDeleted);
  const categories = useCategoryStore((state) => state.categoriesWithDeleted);

  const { handleCreate, handleEdit, handleDelete } = useModifyHandler(
    "transaction",
    deleteTransaction,
  );

  // Main effect to set current user and load initial data
  useEffect(() => {
    setCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCurrentUser]);

  // Effect to refresh transaction data when wallet/category references might be stale
  useEffect(() => {
    const hasTransactions = transactions && transactions.length > 0;
    const hasWallets = wallets && wallets.length > 0;
    const hasCategories = categories && categories.length > 0;

    // If we have transactions loaded but fresh wallet/category data, refresh the references
    if (hasTransactions && (hasWallets || hasCategories)) {
      refreshTransactionData();
    }
  }, [wallets, categories, refreshTransactionData, transactions.length]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title>Transactions</Title>
        <button
          onClick={() => handleCreate()}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          + New Transaction
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800">
            Error loading transactions: {error}
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow mt-5">
        <TransactionTable
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Transactions;
