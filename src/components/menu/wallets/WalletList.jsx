// components/menu/wallets/WalletList.jsx
import { useCallback } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import WalletItem from "./WalletItem";

const WalletList = ({
  wallets,
  activeWallet,
  setActiveWallet,
  handleEditWalletClick,
  handleDeleteWalletClick,
  loading,
  error,
}) => {
  const handleContainerClick = useCallback((e) => {
    // Only deselect if clicking directly on the container, not on child items
    if (e.target === e.currentTarget) {
      setActiveWallet(null);
    }
  }, [setActiveWallet]);

  // Memoize the callback to prevent unnecessary re-renders
  const handleClickOutside = useCallback(() => {
    setActiveWallet(null);
  }, [setActiveWallet]);

  const walletListRef = useClickOutside(handleClickOutside);

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
      ref={walletListRef}
      onClick={handleContainerClick}
      className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4"
    >
      {wallets.map((wallet) => (
        <WalletItem
          key={wallet.id} // Add a key if available
          wallet={wallet}
          activeWallet={activeWallet}
          setActiveWallet={setActiveWallet}
          handleEditWalletClick={handleEditWalletClick}
          handleDeleteWalletClick={handleDeleteWalletClick}
        />
      ))}
    </ul>
  );
};

export default WalletList;
