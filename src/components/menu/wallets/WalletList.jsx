// components/menu/wallets/WalletList.jsx
import React from "react";
import WalletItem from "./WalletItem";

const WalletList = ({ wallets, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return <p>Loading wallets...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (wallets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No wallets found.</p>
        <p className="text-sm">Create your first wallet to get started!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {wallets.map((wallet) => (
        <WalletItem
          key={wallet.id}
          wallet={wallet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default WalletList;
