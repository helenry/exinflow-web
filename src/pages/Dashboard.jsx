// pages/Dashboard.jsx
import Title from "@/components/ui/texts/Title";
import useUserConfigStore from "../stores/userConfig/userConfigStore";
import { getCurrencySymbol } from "../utils/format";
import { TotalBalanceCard } from "../components/menu/dashboard/TotalBalanceCard";

const Dashboard = () => {
  const { userConfig } = useUserConfigStore();
  const mainCurrencySymbol = getCurrencySymbol(
    userConfig.main_currency_code,
  ).symbol;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <Title>Dashboard</Title>
      </div>

      {/* Total Balance Card - Replaces the first stat card */}
      <div className="mb-6">
        <TotalBalanceCard />
      </div>

      {/* Other Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800 mb-1">
            Total Income
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {mainCurrencySymbol}
            {0}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-800 mb-1">
            Total Expenses
          </h3>
          <p className="text-2xl font-bold text-red-600">
            {mainCurrencySymbol}
            {0}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-1">
            Lorem Ipsum
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {mainCurrencySymbol}
            {0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
