// stores/modal/modalActions.js
export const modalActions = (set, initialModalState) => ({
  openModal: ({
    type,
    action,
    itemId = null,
    data = null,
    parentId = null,
  }) => {
    set({
      modal: {
        isOpen: true,
        type,
        action,
        itemId,
        data,
        parentId,
      },
    });
  },

  closeModal: () => {
    set({ modal: { ...initialModalState } });
  },
});
