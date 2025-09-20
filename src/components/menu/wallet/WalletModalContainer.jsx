// components/menu/wallet/WalletModalContainer.jsx
import { useCallback } from "react";
import useWalletStore from "../../../stores/wallet/walletStore";
import WalletModal from "./WalletModal";

const WalletModalContainer = ({ action, itemId, initialData, onClose }) => {
  const { createWallet, updateWallet, loading } = useWalletStore();

  const handleSubmit = useCallback(async (formData) => {
    try {
      if (action === "create") {
        await createWallet(formData);
      } else if (action === "edit") {
        await updateWallet(itemId, formData);
      }
      onClose();
    } catch (error) {
      console.error("Wallet modal submission error:", error);
    }
  }, [action, itemId, createWallet, updateWallet, onClose]);

  return (
    <WalletModal
      onSubmit={handleSubmit}
      onCancel={onClose}
      initialData={initialData}
      loading={loading}
    />
  );
};

export default WalletModalContainer;