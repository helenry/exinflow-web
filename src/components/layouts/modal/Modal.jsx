// components/modal/Modal.jsx
import useModalStore from "../../../stores/modalStore";
import WalletModal from "../../menu/wallets/WalletModal";
import useWalletStore from "../../../stores/walletStore";

const Modal = () => {
  const { closeModal, modal } = useModalStore();

  const { createWallet, updateWallet, loading, error } = useWalletStore();

  // Don't render anything if modal is closed
  if (!modal.isOpen) return null;

  // Handle wallet modal submissions
  const handleWalletSubmit = async (formData) => {
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
  };

  const getModalConfig = () => {
    switch (modal.type) {
      case "wallet":
        return {
          title: modal.data ? "Edit Wallet" : "Create Wallet",
          submitText: "Save",
          cancelText: "Cancel",
        };
      default:
        return {
          title: "Modal",
          submitText: "Submit",
          cancelText: "Cancel",
        };
    }
  };

  // Render the appropriate modal based on modal.type
  const renderModalContent = () => {
    switch (modal.type) {
      case "wallet":
        return (
          <WalletModal onSubmit={handleWalletSubmit} initialData={modal.data} />
        );

      default:
        return null;
    }
  };

  const config = getModalConfig();

  return (
    <div className="m-4 p-4 rounded-lg bg-[#e8f8fc]">
      <h2 className="text-xl font-semibold mb-4">{config.title}</h2>

      {renderModalContent()}

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="flex justify-end space-x-2">
        <button
          onClick={closeModal}
          disabled={loading}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          {config.cancelText}
        </button>
        <button
          onClick={() => {
            // Trigger form submission in the child component
            const form = document.querySelector("[data-modal-form]");
            if (form) {
              const submitEvent = new CustomEvent("modalSubmit");
              form.dispatchEvent(submitEvent);
            }
          }}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : config.submitText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
