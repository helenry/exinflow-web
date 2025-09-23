// pages/Wallets.jsx
import { useCallback, useEffect, useState } from "react";
import Title from "@/components/ui/texts/Title";
import WalletList from "@/components/menu/wallet/WalletList";
import useAuthStore from "../stores/auth/authStore";
import useWalletStore from "../stores/wallet/walletStore";
import WalletSummary from "../components/menu/wallet/WalletSummary";
import { useModifyHandler } from "../hooks/useModifyHandler";

const Wallets = () => {
  // STATES
  const [activeWallet, setActiveWallet] = useState(null);
  const [summaryExpanded, setSummaryExpanded] = useState(true);

  // STORES
  const { currentUser } = useAuthStore();
  const { wallets, deleteWallet, setCurrentUser, loading, error } =
    useWalletStore();

  const { handleCreate, handleEdit, handleDelete } = useModifyHandler(
    "wallet",
    deleteWallet,
    (walletId) => setActiveWallet((prev) => (prev === walletId ? null : prev)),
  );

  // TRIGGER FETCH BASED ON USER
  useEffect(() => {
    setCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCurrentUser]);

  // CLICK HANDLER
  const toggleExpand = () => {
    setSummaryExpanded((prev) => !prev);
  };

  const handleWalletItemClick = (e, walletId) => {
    e.stopPropagation();
    setActiveWallet(walletId);
  };

  const handleContainerClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        setActiveWallet(null);
      }
    },
    [setActiveWallet],
  );

  // JSX
  return (
    <div className="relative">
      <div className="sticky top-0 z-50">
        <WalletSummary
          wallets={wallets}
          activeWallet={activeWallet}
          setActiveWallet={setActiveWallet}
          summaryExpanded={summaryExpanded}
          setSummaryExpanded={setSummaryExpanded}
          toggleExpand={toggleExpand}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <Title>Wallets</Title>
          <button
            onClick={() => handleCreate()}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
          >
            + New Wallet
          </button>
        </div>

        <WalletList
          wallets={wallets}
          activeWallet={activeWallet}
          handleWalletItemClick={handleWalletItemClick}
          handleEditWalletClick={handleEdit}
          handleDeleteWalletClick={handleDelete}
          handleContainerClick={handleContainerClick}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Wallets;
