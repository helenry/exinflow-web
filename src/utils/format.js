// utils/format.js
import { TRIM_FIELDS } from "@/constants";
import { CURRENCY_OPTIONS } from "@/constants";

export const trimStrings = (input) => {
  const trimmed = { ...input };
  TRIM_FIELDS.forEach((field) => {
    if (typeof trimmed[field] === "string") {
      trimmed[field] = trimmed[field].trim();
    }
  });
  return trimmed;
};

export const normalizeString = (input) => input.toLowerCase();

export const getCurrencySymbol = (isoCode) => {
  const currency = CURRENCY_OPTIONS.find(
    (item) => item.iso_code === isoCode.toUpperCase()
  );
  return currency;
}

export const formatMoney = (amount) => {
  if (typeof amount !== 'number') return '0.00';

  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const formatDonutChartData = (data, type) => {
  if(type == 'wallet') {
    
  }
}