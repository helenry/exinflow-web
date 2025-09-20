// components/modal/Modal.jsx
import useModalStore from "../../../stores/modal/modalStore";
import { MODAL } from "@/constants";
import { LuX } from "react-icons/lu";
import CircleButton from "../../ui/buttons/CircleButton";
import { modalRegistry } from "./modalRegistry";

const Modal = () => {
  const { closeModal, modal } = useModalStore();
  
  // Don't render anything if modal is closed
  if (!modal.isOpen) return null;

  const ModalConfig = modalRegistry[modal.type];
  
  if (!ModalConfig) {
    console.error(`Unknown modal type: ${modal.type}`);
    return null;
  }

  return (
    <div className={`${MODAL.MARGIN} ${MODAL.HEIGHT} bg-[#e8f8fc] p-4 rounded-2xl flex justify-between items-center`}>
      <div className="w-[100%] grid grid-rows-[8fr_84fr_8fr] gap-y-5 h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {ModalConfig.getTitle(modal.action)}
          </h2>
          <CircleButton
            icon={LuX}
            onClick={closeModal}
          />
        </div>
       
        <ModalConfig.component 
          action={modal.action}
          itemId={modal.itemId}
          initialData={modal.data}
          parentId={modal.parentId}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default Modal;