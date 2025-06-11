import { LuPencil, LuTrash2 } from "react-icons/lu";
import CircleButton from "../../buttons/CircleButton";
import { formatMoney, getCurrencySymbol } from "../../../utils/format";

// components/menu/wallets/WalletItem.jsx
const WalletItem = ({
  wallet,
  activeWallet,
  setActiveWallet,
  handleEditWalletClick,
  handleDeleteWalletClick,
}) => {
  const handleWalletItemClick = (e) => {
    e.stopPropagation();
    setActiveWallet(wallet.id);
  };

  return (
    <li
      onClick={handleWalletItemClick}
      className={`p-2 flex justify-between items-center rounded-lg border ${
        wallet.id == activeWallet ? "border-red-500" : "border-gray-300"
      }`}
    >
      <div>
        <p>
          <strong style={{ color: `#${wallet.color}` }}>{wallet.name || "Unnamed"}</strong>
        </p>
        <p>
          {getCurrencySymbol(wallet.currency_code)}{formatMoney(wallet.base_amount || 0)}
        </p>
      </div>

      <div className="space-x-2">
        <CircleButton
          onClick={() => handleEditWalletClick(wallet)}
          icon={LuPencil}
        />
        <CircleButton
          onClick={() => handleDeleteWalletClick(wallet.id)}
          icon={LuTrash2}
        />
      </div>
    </li>
  );
};

export default WalletItem;
