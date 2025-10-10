// components/menu/dashboard/TotalBalanceCard.jsx
import { useTotalBalance } from "../../../hooks/useTotalBalance";
import useCurrencyStore from "../../../stores/currency/currencyStore";
import LoadingSpinner from "../../ui/LoadingSpinner";
import CircleButton from "../../ui/buttons/CircleButton";
import Tooltip from "../../ui/Tooltip";
import useUserConfigStore from "../../../stores/userConfig/userConfigStore";
import useAuthStore from "../../../stores/auth/authStore";
import { useEffect } from "react";
import useWalletStore from "../../../stores/wallet/walletStore";
import { formatMoney, getCurrencySymbol } from "../../../utils/format";

export const TotalBalanceCard = () => {
  const { currentUser } = useAuthStore();
  const { userConfig } = useUserConfigStore();
  const { wallets, setCurrentUser } = useWalletStore();
  const { initializeRates, refreshRates } = useCurrencyStore();

  const mainCurrency = userConfig?.main_currency_code;

  const {
    totalBalance,
    breakdown,
    hasMultipleCurrencies,
    needsConversion,
    canCalculate,
    error,
    isLoadingRates,
    ratesError,
    lastUpdated,
    isFromCache,
  } = useTotalBalance(wallets, mainCurrency);

  useEffect(() => {
    setCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCurrentUser]);

  useEffect(() => {
    // Initialize currency rates when wallets are loaded
    if (currentUser?.uid && wallets.length > 0 && mainCurrency) {
      initializeRates(currentUser.uid, wallets, mainCurrency);
    }
  }, [currentUser?.uid, wallets.length, mainCurrency, initializeRates]);

  const handleRefreshRates = async () => {
    if (!currentUser?.uid) return;

    try {
      await refreshRates(currentUser.uid, wallets, mainCurrency);
    } catch (error) {
      console.error("Error refreshing rates:", error);
    }
  };

  const renderBalanceContent = () => {
    if (isLoadingRates) {
      return (
        <div className="flex items-center justify-center py-4">
          <LoadingSpinner size="sm" />
          <span className="ml-2 text-sm text-gray-600">
            Loading exchange rates...
          </span>
        </div>
      );
    }

    if (!canCalculate) {
      return (
        <div className="flex items-center text-red-600">
          <p>circle</p>
          <div>
            <p className="font-medium">Cannot calculate total</p>
            <p className="text-sm">{error || ratesError}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900">
              {getCurrencySymbol(mainCurrency).symbol}
              {formatMoney(totalBalance || 0)}
            </p>
          </div>

          {needsConversion && (
            <div className="flex items-center space-x-2">
              <Tooltip
                content={isFromCache ? "Rates from cache" : "Rates from API"}
              >
                <p
                  className={isFromCache ? "text-yellow-500" : "text-green-500"}
                >
                  info
                </p>
              </Tooltip>

              <Tooltip content="Refresh exchange rates">
                <CircleButton
                  size="sm"
                  variant="secondary"
                  onClick={handleRefreshRates}
                  disabled={isLoadingRates}
                  className={isLoadingRates ? "animate-spin" : ""}
                />
              </Tooltip>
            </div>
          )}
        </div>

        {hasMultipleCurrencies && breakdown.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Breakdown by Wallet
            </p>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {breakdown.map((item) => (
                <div
                  key={item.walletId}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-600 truncate mr-2">
                    {item.name}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">
                      {getCurrencySymbol(item.convertedCurrency).symbol}
                      {formatMoney(item.convertedAmount || 0)}
                    </span>
                    {item.originalCurrency !== mainCurrency && (
                      <span className="text-xs text-gray-500">
                        {getCurrencySymbol(item.originalCurrency).symbol}
                        {formatMoney(item.originalAmount || 0)}
                        {item.rate !== 1 &&
                          ` (Rate: ${getCurrencySymbol(item.originalCurrency).symbol}${formatMoney(item.rate, "rate")})`}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {needsConversion && lastUpdated && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Exchange rates updated: {lastUpdated}
              {isFromCache && " (cached)"}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Portfolio Overview
        </h3>
        {hasMultipleCurrencies && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {wallets.length} wallet{wallets.length !== 1 ? "s" : ""} • Multiple
            currencies
          </span>
        )}
      </div>

      {renderBalanceContent()}

      {wallets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No wallets found</p>
          <p className="text-sm">Create a wallet to see your total balance</p>
        </div>
      )}
    </div>
  );
};
