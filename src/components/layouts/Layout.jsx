// components/layout/Layout.jsx
import { MAIN_BACKGROUND_WHITE } from '../../constants/colors';
import { NAVBAR } from '../../constants/layout';
import Modal from './modal/Modal';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className={`${MAIN_BACKGROUND_WHITE.BG} min-h-screen h-screen flex flex-col`}>
      <Navbar />
      <div
        className={`${NAVBAR.MARGIN} flex-1 grid grid-cols-[auto_65fr_35fr] overflow-hidden`}
      >
        <Sidebar />

        <main className="overflow-y-auto p-3">{children}</main>

        <Modal>
          sdfsdfdsf
        </Modal>
      </div>
    </div>
  );
};

export default Layout;
