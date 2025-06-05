// pages/Wallets.jsx
import { useEffect } from "react";
import Title from "../components/texts/Title";
import WalletList from "../components/menu/wallets/WalletList";
import useAuthStore from "../stores/authStore";
import useWalletStore from "../stores/walletStore";
import useModalStore from "../stores/modalStore";
import {
  createWalletHandler,
  deleteWalletHandler,
  editWalletHandler,
} from "../handlers/walletHandlers";

const Wallets = () => {
  // TYPE
  const type = "wallet";

  // STORES
  const { currentUser } = useAuthStore();
  const { openModal, closeModal, modal } = useModalStore();
  const { wallets, deleteWallet, setCurrentUser, loading, error } =
    useWalletStore();

  // TRIGGER FETCH BASED ON USER
  useEffect(() => {
    setCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCurrentUser]);

  // CED HANDLER
  const handleCreateWalletClick = createWalletHandler(openModal, type);
  const handleEditWalletClick = editWalletHandler(openModal, type);
  const handleDeleteWalletClick = deleteWalletHandler(
    deleteWallet,
    closeModal,
    modal,
    type,
  );

  // JSX
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <Title>Wallets</Title>
        <button
          onClick={handleCreateWalletClick}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          + New Wallet
        </button>
      </div>

      <WalletList
        wallets={wallets}
        handleEditWalletClick={handleEditWalletClick}
        handleDeleteWalletClick={handleDeleteWalletClick}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Wallets;
