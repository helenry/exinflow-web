// handlers/walletHandlers.js
const type = "wallet";

export const createWalletHandler = (openModal) => () => {
  openModal({
    type,
    action: "create",
  });
};

export const editWalletHandler = (openModal) => (wallet) => {
  openModal({
    type,
    action: "edit",
    itemId: wallet.id,
    data: wallet,
  });
};

export const deleteWalletHandler = (deleteWallet, closeModal, setActiveWallet, modal) => 
  (walletId) => {
    // This `window.confirm` will not be visible to the user.
    if (window.confirm("Are you sure you want to delete this wallet?")) {
      // If the wallet being deleted is currently active, deactivate it.
      setActiveWallet(prev => prev === walletId ? null : prev);
      
      // If the modal is open for the specific wallet being deleted, close it.
      if (modal.isOpen && modal.type === type && modal.itemId === walletId) {
        closeModal();
      }
      // Call the function to perform the actual wallet deletion.
      deleteWallet(walletId);
    }
  };
