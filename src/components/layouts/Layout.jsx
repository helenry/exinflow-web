// components/layout/Layout.jsx
import { MAIN_BACKGROUND_WHITE, NAVBAR } from "@/constants";
import useModalStore from "../../stores/modalStore";
import Modal from "./modal/Modal";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Layout = ({ children }) => {
  const { modal } = useModalStore();

  return (
    <div
      className={`${MAIN_BACKGROUND_WHITE.BG} min-h-screen h-screen flex flex-col`}
    >
      <Navbar />
      <div
        className={`${NAVBAR.MARGIN_TOP} ${modal.isOpen ? "grid-cols-[auto_65fr_35fr]" : "grid-cols-[auto_100fr]"} flex-1 grid overflow-hidden`}
      >
        <Sidebar />

        <main className="overflow-y-auto pl-4 pr-2 pb-4">{children}</main>

        <Modal />
      </div>
    </div>
  );
};

export default Layout;
