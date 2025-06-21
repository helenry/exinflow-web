// /hooks/charts/usePieChartData.js
import { useMemo } from 'react';
import { hexToRgba } from '../../utils/type';
import { PIE_CHART_CONFIG } from '../../constants/configs';

export const usePieChartData = (data, activeWallet) => {
  return useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item) => {
      // Validate required properties
      if (!item.base_amount || !item.name || !item.color || !item.id) {
        console.warn('Invalid data item:', item);
        return null;
      }

      const isActive = activeWallet === null || activeWallet === item.id;
      const color = item.color.startsWith('#') ? item.color : `#${item.color}`;

      return {
        value: Number(item.base_amount) || 0,
        label: item.name,
        color: isActive ? color : hexToRgba(color, PIE_CHART_CONFIG.inactiveOpacity),
        id: item.id,
      };
    }).filter(Boolean);
  }, [data, activeWallet]);
};