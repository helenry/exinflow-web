// components/modal/modalRegistry.js
import WalletModalContainer from "../../menu/wallet/WalletModalContainer";
import CategoryModalContainer from "../../menu/category/CategoryModalContainer";
import SubcategoryModalContainer from "../../menu/category/subcategory/SubcategoryModalContainer";

export const modalRegistry = {
  wallet: {
    component: WalletModalContainer,
    getTitle: (action) => action === "edit" ? "Edit Wallet" : "Create Wallet"
  },
  category: {
    component: CategoryModalContainer,
    getTitle: (action) => action === "edit" ? "Edit Category" : "Create Category"
  },
  subcategory: {
    component: SubcategoryModalContainer,
    getTitle: (action) => action === "edit" ? "Edit Subcategory" : "Create Subcategory"
  }
};