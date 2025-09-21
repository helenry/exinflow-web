// hooks/useModifyHandler.js
import useModalStore from "../stores/modal/modalStore";

export const useModifyHandler = (
  type,
  deleteFunction,
  customDeleteLogic = null,
) => {
  const { openModal, closeModal, modal } = useModalStore();

  const handleCreate = (parentId = null) => {
    openModal({
      type,
      action: "create",
      ...(parentId && { parentId }),
    });
  };

  const handleEdit = (item, parentId = null) => {
    openModal({
      type,
      action: "edit",
      itemId: item.id,
      data: item,
      ...(parentId && { parentId }),
    });
  };

  const handleDelete = (...args) => {
    const itemId = args[args.length - 1]; // Last argument is always itemId

    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      // Execute custom logic before deletion (e.g., setActiveWallet for wallets)
      if (customDeleteLogic) {
        customDeleteLogic(itemId, ...args);
      }

      // Close modal if it's open for this item
      if (modal.isOpen && modal.type === type && modal.itemId === itemId) {
        closeModal();
      }

      // Call the delete function with all arguments
      deleteFunction(...args);
    }
  };

  return {
    handleCreate,
    handleEdit,
    handleDelete,
  };
};
