import { create } from "zustand";
import { modalActions } from "./modalActions";

const initialModalState = {
  isOpen: false,
  type: null,
  action: null,
  itemId: null,
  data: null,
  parentId: null
};

const useModalStore = create((set) => ({
  // State
  modal: { ...initialModalState },

  // Actions
  ...modalActions(set, initialModalState),
}));

export default useModalStore;