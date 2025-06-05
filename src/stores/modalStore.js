// stores/modalStore.js
import { create } from "zustand";

const initialModalState = {
  isOpen: false,
  type: null,
  action: null,
  itemId: null,
  data: null,
};

const useModalStore = create((set) => ({
  modal: { ...initialModalState },

  openModal: ({ type, action, itemId = null, data = null }) => {
    set({
      modal: {
        isOpen: true,
        type,
        action,
        itemId,
        data,
      },
    });
  },

  closeModal: () => {
    set({ modal: { ...initialModalState } });
  },
}));

export default useModalStore;
