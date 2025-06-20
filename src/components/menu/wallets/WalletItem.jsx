import { LuPencil, LuTrash2 } from "react-icons/lu";
import CircleButton from "../../ui/buttons/CircleButton";
import { formatMoney, getCurrencySymbol } from "../../../utils/format";

// components/menu/wallets/WalletItem.jsx
const WalletItem = ({
  wallet,
  activeWallet,
  handleWalletItemClick,
  handleEditWalletClick,
  handleDeleteWalletClick,
}) => {
  const currency = getCurrencySymbol(wallet.currency_code)
  
  return (
    <li
      onClick={(e) => handleWalletItemClick(e, wallet.id)}
      className="p-2 flex justify-between items-center rounded-lg border"
      style={{
        borderColor: activeWallet && wallet.id == activeWallet ? `#${wallet.color}` : '#e6e6e6',
        borderWidth: 1,
      }}
    >
      <div>
        <p className="text-lg">
          <strong style={{ color: `#${wallet.color}` }}>{wallet.name || "Unnamed"}</strong>
        </p>
        <p>
          {currency?.symbol}{formatMoney(wallet.base_amount || 0)}
        </p>
        <p className="text-gray-400">
          ({currency?.iso_code}) {currency?.name}
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
