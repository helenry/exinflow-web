// components/layouts/modal/ModalContainer.jsx
import { useCallback } from "react";
import useWalletStore from "../../../stores/wallet/walletStore";
import useCategoryStore from "../../../stores/category/categoryStore";
import useTransactionStore from "../../../stores/transaction/transactionStore";

// Store mapping configuration
const storeMap = {
  wallet: {
    useStore: useWalletStore,
    functions: {
      create: "createWallet",
      update: "updateWallet",
    },
  },
  category: {
    useStore: useCategoryStore,
    functions: {
      create: "createCategory",
      update: "updateCategory",
    },
  },
  subcategory: {
    useStore: useCategoryStore,
    functions: {
      create: "createSubcategory",
      update: "updateSubcategory",
    },
  },
  transaction: {
    useStore: useTransactionStore,
    functions: {
      create: "createTransaction",
      update: "updateTransaction",
    },
  },
};

const ModalContainer = ({
  type,
  action,
  itemId,
  initialData,
  parentId,
  onClose,
  children,
}) => {
  const storeConfig = storeMap[type];

  if (!storeConfig) {
    console.error(`Unknown modal type: ${type}`);
    return null;
  }

  const storeData = storeConfig.useStore();
  const createFunction = storeData[storeConfig.functions.create];
  const updateFunction = storeData[storeConfig.functions.update];
  const { loading } = storeData;

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        if (action === "create") {
          if (parentId) {
            await createFunction(parentId, formData);
          } else {
            await createFunction(formData);
          }
        } else if (action === "edit") {
          console.lg("✏️ [handleSubmit] Edit flow triggered");
          if (parentId) {
            await updateFunction(parentId, itemId, formData);
          } else {
            await updateFunction(itemId, formData);
          }
        } else {
          console.warn("⚠️ [handleSubmit] Unknown action:", action);
        }

        onClose();
      } catch (error) {
        console.error(`❌ [handleSubmit] ${type} modal submission error:`, error);
      }
    },
    [action, itemId, parentId, createFunction, updateFunction, onClose, type]
  );

  // Clone children and pass props
  return children({
    onSubmit: handleSubmit,
    onCancel: onClose,
    initialData,
    loading,
  });
};

export default ModalContainer;
