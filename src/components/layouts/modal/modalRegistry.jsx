// components/layouts/modal/modalRegistry.jsx
import ModalContainer from "./ModalContainer";
import WalletModal from "../../menu/wallet/WalletModal";
import CategoryModal from "../../menu/category/CategoryModal";
import SubcategoryModal from "../../menu/category/subcategory/SubcategoryModal";
import TransactionModal from "../../menu/transaction/TransactionModal";

// Factory function to create modal registry entries
const createModalEntry = (type, ModalComponent, entityName) => ({
  component: (props) => (
    <ModalContainer type={type} {...props}>
      {(containerProps) => <ModalComponent {...containerProps} />}
    </ModalContainer>
  ),
  getTitle: (action) =>
    action === "edit" ? `Edit ${entityName}` : `Create ${entityName}`,
});

export const modalRegistry = {
  wallet: createModalEntry("wallet", WalletModal, "Wallet"),
  category: createModalEntry("category", CategoryModal, "Category"),
  subcategory: createModalEntry("subcategory", SubcategoryModal, "Subcategory"),
  transaction: createModalEntry("transaction", TransactionModal, "Transaction"),
};
