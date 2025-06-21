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
    if (window.confirm("Are you sure you want to delete this wallet?")) {
      setActiveWallet(prev => prev === walletId ? null : prev);
      
      if (modal.isOpen && modal.type === type && modal.itemId === walletId) {
        closeModal();
      }
      deleteWallet(walletId);
    }
  };