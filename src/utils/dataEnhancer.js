// utils/dataEnhancer.js
export class TransactionEnhancer {
  static enhanceTransactions(transactions, wallets = [], categories = []) {
    if (!transactions.length) return transactions;

    // Create lookup maps
    const walletMap = new Map(wallets.map((w) => [w.id, w]));
    const categoryMap = new Map();
    const subcategoryMap = new Map();

    categories.forEach((category) => {
      categoryMap.set(category.id, category);
      if (category.subcategories) {
        category.subcategories.forEach((sub) => {
          subcategoryMap.set(sub.id, { ...sub, category });
        });
      }
    });

    // Enhance transactions
    return transactions.map((transaction) => ({
      ...transaction,
      wallet: transaction.wallet_id
        ? walletMap.get(transaction.wallet_id)
        : null,
      source_wallet: transaction.source_wallet_id
        ? walletMap.get(transaction.source_wallet_id)
        : null,
      destination_wallet: transaction.destination_wallet_id
        ? walletMap.get(transaction.destination_wallet_id)
        : null,
      category: transaction.category_id
        ? categoryMap.get(transaction.category_id)
        : null,
      subcategory: transaction.subcategory_id
        ? subcategoryMap.get(transaction.subcategory_id)
        : null,
    }));
  }
}
