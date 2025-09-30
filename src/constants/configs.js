// constants/configs.js
export const CURRENCY_API = {
  BASE_URL: "https://api.currencyapi.com/v3",
  ENDPOINTS: {
    LATEST: "/latest",
  },
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

export const PIE_CHART_CONFIG = {
  innerRadius: 30,
  outerRadius: 100,
  cornerRadius: 5,
  width: 250,
  height: 250,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  inactiveOpacity: 0.2,
};
