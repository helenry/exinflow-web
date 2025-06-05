// handlers/walletHandlers.js
export const createWalletHandler = (openModal, type) => () => {
  openModal({
    type: type,
    action: "create",
  });
};

export const editWalletHandler = (openModal, type) => (wallet) => {
  openModal({
    type: type,
    action: "edit",
    itemId: wallet.id,
    data: wallet,
  });
};

export const deleteWalletHandler =
  (deleteWallet, closeModal, modal, type) => (walletId) => {
    if (window.confirm("Are you sure you want to delete this wallet?")) {
      if (modal.isOpen && modal.type === type && modal.itemId === walletId) {
        closeModal();
      }
      deleteWallet(walletId);
    }
  };
