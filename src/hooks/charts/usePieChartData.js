// /hooks/charts/usePieChartData.js
// This custom React hook processes and formats raw data for use in a pie chart component.
// It leverages React's useMemo hook to optimize performance by memoizing the data transformation.
// This prevents unnecessary recalculations on every render, as long as the input data or active wallet ID hasn't changed.

import { useMemo } from "react";
import { hexToRgba } from "../../utils/type"; // Utility function to convert a hex color to an RGBA color.
import { PIE_CHART_CONFIG } from "../../constants/configs"; // Configuration constants for the pie chart, such as opacity for inactive items.

/**
 * A custom hook to transform raw wallet data into a format suitable for a pie chart.
 * It also handles the logic for dimming inactive wallets.
 * @param {Array} data - An array of wallet objects. Each object is expected to have properties: `current_balance`, `name`, `color`, and `id`.
 * @param {string|null} activeWallet - The ID of the currently active wallet, or `null` if no wallet is selected.
 * @returns {Array} An array of formatted objects, ready to be used by a pie chart library.
 */
export const usePieChartData = (data, activeWallet) => {
  // useMemo caches the result of the function. It only re-runs if `data` or `activeWallet` change.
  return useMemo(() => {
    // Check if the input data is a valid array and not empty.
    // If not, return an empty array to prevent errors.
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Map over the input data array to transform each item.
    return data
      .map((item) => {
        // Validate that each data item has the required properties.
        // If a required property is missing, log a warning and return null for that item.
        if (!item.current_balance || !item.name || !item.color || !item.id) {
          console.warn("Invalid data item:", item);
          return null;
        }

        // Determine if the current wallet item is the active one.
        // An item is active if `activeWallet` is null (all are active) or if its ID matches the `activeWallet` ID.
        const isActive = activeWallet === null || activeWallet === item.id;

        // Ensure the color string starts with a '#' to be a valid hex code.
        const color = item.color.startsWith("#")
          ? item.color
          : `#${item.color}`;

        // Return the new, formatted object for the pie chart.
        return {
          // Use `Number()` to ensure `current_balance` is a number, defaulting to 0 if invalid.
          value: Number(item.current_balance) || 0,
          label: item.name,
          // Conditionally apply the color. If the item is active, use its original color.
          // If not, use the `hexToRgba` utility to make it semi-transparent based on the config.
          color: isActive
            ? color
            : hexToRgba(color, PIE_CHART_CONFIG.inactiveOpacity),
          id: item.id,
        };
      })
      .filter(Boolean); // Filter out any `null` values that were returned from invalid data items.
  }, [data, activeWallet]); // The dependencies array. The hook will re-run only when `data` or `activeWallet` changes.
};
