// handlers/walletHandlers.js
// This file contains a set of "handler" functions that manage the logic for user interactions
// with wallets, such as opening modals for creation, editing, and deletion.
// They centralize the UI-related actions, making the components that use them cleaner.

const type = "wallet";

/**
 * Creates a click handler function to open a modal for creating a new wallet.
 * @param {Function} openModal - The function to open the modal, typically from a custom hook.
 * @returns {Function} A function that, when invoked, opens the modal with the appropriate
 * type and action for creating a wallet.
 */
export const createWalletHandler = (openModal) => () => {
  openModal({
    type,
    action: "create",
  });
};

/**
 * Creates a click handler function to open a modal for editing an existing wallet.
 * It passes the specific wallet's data to the modal for pre-filling the form.
 * @param {Function} openModal - The function to open the modal.
 * @returns {Function} A function that, when called with a wallet object, opens the modal
 * with the provided wallet's data and ID for editing.
 */
export const editWalletHandler = (openModal) => (wallet) => {
  openModal({
    type,
    action: "edit",
    itemId: wallet.id,
    data: wallet,
  });
};

/**
 * Creates a handler function to delete a wallet.
 * This function handles the user confirmation, updates the UI state, and then triggers the
 * deletion process.
 * NOTE: The use of `window.confirm` is not recommended in this immersive environment, as it
 * is a blocking operation that the user cannot interact with. A custom modal component should be used instead.
 * @param {Function} deleteWallet - The function to call the wallet deletion service.
 * @param {Function} closeModal - The function to close the modal.
 * @param {Function} setActiveWallet - The state setter to change the currently active wallet.
 * @param {object} modal - The current state of the modal (e.g., isOpen, type, itemId).
 * @returns {Function} A function that, when called with a wallet ID, handles the deletion process.
 */
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
