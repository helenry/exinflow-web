// components/menu/wallets/WalletSummary.jsx
import { PieChart } from '@mui/x-charts/PieChart';
import { LuChevronDown, LuChevronUp } from "react-icons/lu"; // or use any other icons you like
import CircleButton from "../../ui/buttons/CircleButton";
import { formatMoney, getCurrencySymbol } from "../../../utils/format";

const WalletSummary = ({
  activeWallet,
  summaryExpanded,
  toggleExpand
}) => {
  let currency
  
  if(activeWallet) currency = getCurrencySymbol(activeWallet.currency_code)

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
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                  cornerRadius: 5,
                }
              ]}
              width={250}
              height={250}
              // margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            />
          </div>

          <div className="col-span-7">
            {activeWallet && (
              <>
                <p className="text-lg">
                  <strong style={{ color: `#${activeWallet.color}` }}>{activeWallet.name || "Unnamed"}</strong>
                </p>
                <p>
                  {currency?.symbol}{formatMoney(activeWallet.base_amount || 0)}
                </p>
                <p className="text-gray-400">
                  ({currency?.iso_code}) {currency?.name}
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
