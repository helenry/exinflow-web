// components/menu/wallets/WalletSummary.jsx
import { LuChevronDown, LuChevronUp } from "react-icons/lu"; // or use any other icons you like
import CircleButton from "../../ui/buttons/CircleButton";
import { formatMoney, getCurrencySymbol } from "../../../utils/format";
import { PieChart } from "../../charts/PieChart";

const WalletSummary = ({
  wallets,
  activeWallet,
  summaryExpanded,
  toggleExpand
}) => {
  const wallet = wallets.find(wallet => wallet.id == activeWallet);
  if(wallet & activeWallet) wallet.currency = getCurrencySymbol(wallet.currency_code)

  return (
    <div className="rounded-lg p-4 border border-gray-200 mb-5">
      <div className="flex justify-between items-center">
        <p>Summary</p>
        <CircleButton
          icon={summaryExpanded ? LuChevronUp : LuChevronDown}
          onClick={toggleExpand}
          size={30}
        />
      </div>

      {summaryExpanded && (
        <div className="mt-4 grid grid-cols-10 gap-4">
          <div className="col-span-3">
            <PieChart
              data={wallets}
            />
          </div>

          <div className="col-span-7">
            {wallet && activeWallet && (
              <>
                <p className="text-lg">
                  <strong style={{ color: `#${wallet.color}` }}>{wallet.name || "Unnamed"}</strong>
                </p>
                <p>
                  {wallet.currency?.symbol}{formatMoney(wallet.base_amount || 0)}
                </p>
                <p className="text-gray-400">
                  ({wallet.currency?.iso_code}) {wallet.currency?.name}
                </p>
              </>
            )}
            {!activeWallet && <>
              <p>Hello World</p>
            </>}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSummary;
