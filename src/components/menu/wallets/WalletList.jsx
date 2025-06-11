// components/menu/wallets/WalletList.jsx
import { useCallback } from "react";
import WalletItem from "./WalletItem";

const WalletList = ({
  wallets,
  activeWallet,
  handleWalletItemClick,
  handleEditWalletClick,
  handleDeleteWalletClick,
  handleContainerClick,
  loading,
  error,
}) => {
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
    <ul
      onClick={handleContainerClick}
      className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4"
    >
      {wallets.map((wallet) => (
        <WalletItem
          key={wallet.id} // Add a key if available
          wallet={wallet}
          activeWallet={activeWallet}
          handleWalletItemClick={handleWalletItemClick}
          handleEditWalletClick={handleEditWalletClick}
          handleDeleteWalletClick={handleDeleteWalletClick}
        />
      ))}
    </ul>
  );
};

export default WalletList;
