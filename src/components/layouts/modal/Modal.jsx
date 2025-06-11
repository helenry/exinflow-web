// components/modal/Modal.jsx
import React, { useCallback } from "react";
import useModalStore from "../../../stores/modalStore";
import WalletModal from "../../menu/wallets/WalletModal";
import useWalletStore from "../../../stores/walletStore";
import { MODAL } from "@/constants";
import { PiXBold } from "react-icons/pi";
import { LuX } from "react-icons/lu";
import CircleButton from "../../buttons/CircleButton";

const Modal = () => {
  const { closeModal, modal } = useModalStore();
  const { createWallet, updateWallet, loading } = useWalletStore();

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
  const getModalTitle = useCallback(() => {
    switch (modal.type) {
      case "wallet":
        return modal.action === "edit" ? "Edit Wallet" : "Create Wallet";
      default:
        return "Modal";
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

  const title = getModalTitle();

  return (
    <div className={`${MODAL.MARGIN} ${MODAL.HEIGHT} bg-[#e8f8fc] p-4 rounded-lg flex justify-between items-center`}>
      <div className="w-[100%] grid grid-rows-[8fr_84fr_8fr] gap-y-5 h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>
          <CircleButton
            icon={LuX}
            onClick={closeModal}
          />
        </div>
        
        {renderModalContent()}
      </div>
    </div>
  );
};

export default Modal;