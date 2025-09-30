// constants/formBases.js
import { THEME_COLOR } from "./colors";
import { TRANSACTION_TYPES } from "./types";

export const WALLET_FORM_BASE = (mainCurrencyCode) => ({
  name: "",
  base_amount: 0,
  color: THEME_COLOR.RAW,
  currency_code: mainCurrencyCode,
});

export const CATEGORY_FORM_BASE = {
  type: TRANSACTION_TYPES.EXPENSE,
  name: "",
  color: THEME_COLOR.RAW,
  icon: "lusmile",
};

export const SUBCATEGORY_FORM_BASE = {
  name: "",
  icon: "lusmile",
};

export const TRANSACTION_FORM_BASE = {
  type: TRANSACTION_TYPES.EXPENSE,
  amount: 0,
  date: new Date().toISOString().split("T")[0],
  wallet_id: "",
  source_wallet_id: "",
  destination_wallet_id: "",
  category_id: null,
  subcategory_id: null,
  note: "",
};
