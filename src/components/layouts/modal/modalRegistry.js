// components/modal/modalRegistry.js
import WalletModalContainer from "../../menu/wallets/WalletModalContainer";
import CategoryModalContainer from "../../menu/categories/CategoryModalContainer";

export const modalRegistry = {
  wallet: {
    component: WalletModalContainer,
    getTitle: (action) => action === "edit" ? "Edit Wallet" : "Create Wallet"
  },
  category: {
    component: CategoryModalContainer,
    getTitle: (action) => action === "edit" ? "Edit Category" : "Create Category"
  }
};