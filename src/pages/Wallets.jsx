// pages/Wallets.jsx
import React, { useEffect } from 'react';
import { useWalletModal } from '../hooks/useWalletModal';
import Title from '../components/texts/Title';
import WalletModal from '../components/menu/wallets/WalletModal';
import WalletList from '../components/menu/wallets/WalletList';
import useAuthStore from '../stores/authStore';
import useWalletStore from '../stores/walletStore';
import useUserConfigStore from '../stores/userConfigStore';

const Wallets = () => {
  const { currentUser } = useAuthStore();
  const { userConfig } = useUserConfigStore();
  
  const {
    wallets,
    loading,
    error,
    setCurrentUser,
    createWallet,
    updateWallet,
    deleteWallet,
    getWallets,
  } = useWalletStore();

  // Set current user and trigger wallet fetching when user changes
  useEffect(() => {
    setCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCurrentUser]);

  const {
    modalOpen,
    editingWallet,
    modalError,
    modalLoading,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreate,
    handleUpdate,
  } = useWalletModal(createWallet, updateWallet);

  // Manual refetch function (if needed)
  const handleRefetch = () => {
    if (currentUser?.uid) {
      getWallets(currentUser.uid);
    }
  };

  return (
    <div className="">
      <p>{userConfig.main_currency_code}</p>
      <div className="flex justify-between items-center mb-6">
        <Title>Wallets</Title>
        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          + New Wallet
        </button>
      </div>

      <WalletList
        wallets={wallets}
        loading={loading}
        error={error}
        onEdit={openEditModal}
        onDelete={deleteWallet}
        onRefetch={handleRefetch} // Optional: if your WalletList needs a refetch button
      />

      <WalletModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={editingWallet ? handleUpdate : handleCreate}
        initialData={editingWallet}
        loading={modalLoading}
        error={modalError}
      />
    </div>
  );
};

export default Wallets;