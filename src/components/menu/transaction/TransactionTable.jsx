// components/menu/transaction/TransactionTable.jsx
import React, { useMemo } from "react";
import { TRANSACTION_TYPES } from "@/constants";
import RenderIcon from "../../common/RenderIcon";
import {
  formatDateWithDay,
  formatMoney,
  getCurrencySymbol,
  getNormalizedDate,
} from "../../../utils/format";

const TransactionTable = ({ transactions, onEdit, onDelete, loading }) => {
  // Helper function to get wallet display with color and icon
  const getWalletDisplay = (transaction) => {
    if (transaction.type === TRANSACTION_TYPES.TRANSFER) {
      const sourceWallet = transaction.source_wallet;
      const destWallet = transaction.destination_wallet;

      return (
        <div className="flex items-center space-x-2">
          <div
            className="flex items-center space-x-1 px-2 py-1 rounded-full border text-xs"
            style={{
              borderColor: `#${sourceWallet.color}`,
              color: `#${sourceWallet.color}`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: `#${sourceWallet.color}` }}
            />
            <span className="truncate max-w-[60px]">
              {sourceWallet?.name || "Unknown"}
            </span>
          </div>
          <span className="text-gray-400 text-xs">→</span>
          <div
            className="flex items-center space-x-1 px-2 py-1 rounded-full border text-xs"
            style={{
              borderColor: `#${destWallet.color}`,
              color: `#${destWallet.color}`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: `#${destWallet.color}` }}
            />
            <span className="truncate max-w-[60px]">
              {destWallet?.name || "Unknown"}
            </span>
          </div>
        </div>
      );
    }

    const wallet = transaction.wallet;
    return (
      <div
        className="inline-flex items-center space-x-2 px-2 py-1 rounded-full border text-xs max-w-full"
        style={{ borderColor: `#${wallet.color}`, color: `#${wallet.color}` }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: `#${wallet.color}` }}
        />
        <span className="truncate">{wallet?.name || "Unknown"}</span>
      </div>
    );
  };

  // Helper function to get category display with color and icon
  const getCategoryDisplay = (transaction) => {
    if (!transaction.category)
      return <span className="text-gray-400 text-xs">-</span>;

    const category = transaction.category;
    const subcategory = transaction.subcategory;

    return (
      <div className="flex items-center">
        {subcategory ? (
          <div
            className="flex items-center text-xs px-2 py-1 rounded-full text-white space-x-1 max-w-full"
            style={{ backgroundColor: `#${category.color}` }}
          >
            <RenderIcon iconName={subcategory.icon} color="#FFFFFF" size={12} />
            <span className="truncate">{subcategory.name}</span>
          </div>
        ) : (
          <div
            className="flex items-center text-xs px-2 py-1 rounded-full text-white space-x-1 max-w-full"
            style={{ backgroundColor: `#${category.color}` }}
          >
            <RenderIcon iconName={category.icon} color="#FFFFFF" size={12} />
            <span className="truncate">{category.name}</span>
          </div>
        )}
      </div>
    );
  };

  // Helper function to get amount styling
  const getAmountStyle = (type) => {
    switch (type) {
      case TRANSACTION_TYPES.INCOME:
        return "text-green-600 font-semibold";
      case TRANSACTION_TYPES.EXPENSE:
        return "text-red-600 font-semibold";
      case TRANSACTION_TYPES.TRANSFER:
        return "text-blue-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  // Prepare transactions with date info for single table
  const preparedTransactions = useMemo(() => {
    if (!transactions) return [];

    const transactionsWithDate = transactions.map((transaction) => {
      const normalizedDate = getNormalizedDate(transaction.date);
      const dateKey = normalizedDate
        ? normalizedDate.toISOString().split("T")[0]
        : "unknown";
      const dateInfo = normalizedDate
        ? formatDateWithDay(normalizedDate)
        : { displayText: "Unknown Date", isToday: false };

      return {
        ...transaction,
        dateKey,
        dateInfo,
        sortDate: normalizedDate || new Date(0),
      };
    });

    // Sort by date (most recent first), then by time if available
    return transactionsWithDate.sort((a, b) => {
      const dateCompare = b.sortDate.getTime() - a.sortDate.getTime();
      if (dateCompare !== 0) return dateCompare;
      // If same date, sort by ID as secondary sort (assuming newer IDs are higher)
      return b.id - a.id;
    });
  }, [transactions]);

  // Helper to check if we need to show date header
  const shouldShowDateHeader = (transaction, index) => {
    if (index === 0) return true;
    return transaction.dateKey !== preparedTransactions[index - 1].dateKey;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading transactions...</div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-2">No transactions found</div>
        <p className="text-sm text-gray-400">
          Start by creating your first transaction
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50 sticky top-0 z-20">
            <tr>
              <th className="w-32 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wallet
              </th>
              <th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="w-24 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {preparedTransactions.map((transaction, index) => (
              <React.Fragment key={`${transaction.dateKey}-${transaction.id}`}>
                {shouldShowDateHeader(transaction, index) && (
                  <tr>
                    <td colSpan="4" className="px-0 py-0">
                      <div
                        className={`sticky top-12 z-10 px-4 py-2 mx-4 my-2 rounded-lg ${
                          transaction.dateInfo.isToday
                            ? "bg-blue-50 border-2 border-blue-200"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <h3
                          className={`font-semibold text-sm ${
                            transaction.dateInfo.isToday
                              ? "text-blue-800"
                              : "text-gray-800"
                          }`}
                        >
                          {transaction.dateInfo.displayText}
                          {transaction.dateInfo.isToday && (
                            <span className="ml-2 text-xs font-normal text-blue-600">
                              (Today)
                            </span>
                          )}
                        </h3>
                      </div>
                    </td>
                  </tr>
                )}
                <tr className="hover:bg-gray-50">
                  <td
                    className={`w-32 px-4 py-3 text-sm text-right ${getAmountStyle(transaction.type)}`}
                  >
                    <div className="truncate">
                      {`${
                        getCurrencySymbol(
                          transaction.wallet?.currency_code ||
                            transaction.source_wallet?.currency_code,
                        ).symbol
                      }${formatMoney(
                        transaction.amount,
                        transaction.wallet?.currency_code ||
                          transaction.source_wallet?.currency_code,
                      )}`}
                    </div>
                  </td>
                  <td className="w-48 px-4 py-3">
                    {getWalletDisplay(transaction)}
                  </td>
                  <td className="w-40 px-4 py-3">
                    {getCategoryDisplay(transaction)}
                  </td>
                  <td className="w-24 px-4 py-3 text-center text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onEdit(transaction)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                        title="Edit transaction"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-xs"
                        title="Delete transaction"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
