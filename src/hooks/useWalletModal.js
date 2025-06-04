// hooks/useWalletModal.js
import { useState } from 'react';

export const useWalletModal = (createWallet, updateWallet) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWallet, setEditingWallet] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const openCreateModal = () => {
    setEditingWallet(null);
    setModalError(null);
    setModalOpen(true);
  };

  const openEditModal = wallet => {
    setEditingWallet(wallet);
    setModalError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (modalLoading) return; // prevent close while saving
    setModalOpen(false);
    setModalError(null);
  };

  const handleCreate = async walletData => {
    setModalLoading(true);
    setModalError(null);
    try {
      await createWallet(walletData);
      setModalOpen(false);
    } catch (e) {
      setModalError(e.message || 'Failed to create wallet');
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdate = async walletData => {
    if (!editingWallet) return;
    setModalLoading(true);
    setModalError(null);
    try {
      await updateWallet(editingWallet.id, walletData);
      setModalOpen(false);
    } catch (e) {
      setModalError(e.message || 'Failed to update wallet');
    } finally {
      setModalLoading(false);
    }
  };

  return {
    modalOpen,
    editingWallet,
    modalError,
    modalLoading,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreate,
    handleUpdate,
  };
};