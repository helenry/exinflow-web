// components/menu/wallets/WalletItem.jsx
import CircleButton from "../../ui/buttons/CircleButton";
import { formatMoney, getCurrencySymbol } from "../../../utils/format";
import Tooltip from "../../ui/Tooltip";
import { ICONS } from "../../../constants/icons";

const WalletItem = ({
  wallet,
  activeWallet,
  handleWalletItemClick,
  handleEditWalletClick,
  handleDeleteWalletClick,
}) => {
  const currency = getCurrencySymbol(wallet.currency_code);

  return (
    <li
      onClick={(e) => handleWalletItemClick(e, wallet.id)}
      className="p-2 flex justify-between items-center rounded-lg border"
      style={{
        borderColor:
          activeWallet && wallet.id == activeWallet ? `#${wallet.color}` : "#e6e6e6",
        borderWidth: 1,
      }}
    >
      <div className="min-w-0">
        <p className="text-lg font-bold" style={{ color: `#${wallet.color}` }}>
          <span className="block max-w-[150px] truncate">{wallet.name || "Unnamed"}</span>
        </p>
        <p>
          {currency?.symbol}
          {formatMoney(wallet.base_amount || 0)}
        </p>
        <p className="text-gray-400">
          ({currency?.iso_code}) {currency?.name}
        </p>
      </div>

      <div className="space-x-2 flex">
        <Tooltip key={`${wallet.id}-edit`} content="Edit" position="top" delay={500}>
          <CircleButton onClick={() => handleEditWalletClick(wallet)} icon={ICONS.EDIT} />
        </Tooltip>

        <Tooltip key={`${wallet.id}-delete`} content="Delete" position="top" delay={500}>
          <CircleButton onClick={() => handleDeleteWalletClick(wallet.id)} icon={ICONS.DELETE} />
        </Tooltip>
      </div>
    </li>
  );
};

export default WalletItem;
