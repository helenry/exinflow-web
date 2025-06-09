// components/modal/Modal.jsx
import React, { useCallback } from "react";
import useModalStore from "../../../stores/modalStore";
import WalletModal from "../../menu/wallets/WalletModal";
import useWalletStore from "../../../stores/walletStore";

const Modal = () => {
  const { closeModal, modal } = useModalStore();
  const { createWallet, updateWallet, loading, error } = useWalletStore();

  // Handle wallet modal submissions
  const handleWalletSubmit = useCallback(async (formData) => {
    try {
      if (modal.action === "create") {
        await createWallet(formData);
      } else if (modal.action === "edit") {
        await updateWallet(modal.itemId, formData);
      }
      closeModal();
    } catch (error) {
      // Error is handled by the store, modal stays open to show error
      console.error("Modal submission error:", error);
    }
  }, [modal.action, modal.itemId, createWallet, updateWallet, closeModal]);

  // Modal configuration based on type and action
  const getModalConfig = useCallback(() => {
    switch (modal.type) {
      case "wallet":
        return {
          title: modal.action === "edit" ? "Edit Wallet" : "Create Wallet",
        };
      default:
        return {
          title: "Modal",
        };
    }
  }, [modal.type, modal.action]);

  // Render the appropriate modal content based on modal.type
  const renderModalContent = useCallback(() => {
    switch (modal.type) {
      case "wallet":
        return (
          <WalletModal
            onSubmit={handleWalletSubmit}
            onCancel={closeModal}
            initialData={modal.data}
            loading={loading}
          />
        );
      default:
        return <div>Unknown modal type</div>;
    }
  }, [modal.type, modal.data, handleWalletSubmit, closeModal, loading]);

  // Don't render anything if modal is closed
  if (!modal.isOpen) return null;

  const config = getModalConfig();

  return (
    <div className="m-4 p-4 rounded-lg bg-[#e8f8fc]">
      <h2 className="text-xl font-semibold mb-4">{config.title}</h2>
      
      {error && (
        <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded text-red-700">
          {error}
        </div>
      )}
      
      {renderModalContent()}
    </div>
  );
};

export default Modal;