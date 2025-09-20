// constants/formBases.js
import { THEME_COLOR } from "./colors";

export const WALLET_FORM_BASE = (mainCurrencyCode) => ({
  name: "",
  base_amount: 0,
  color: THEME_COLOR.RAW,
  currency_code: mainCurrencyCode,
});

export const CATEGORY_FORM_BASE = {
  type: "",
  name: "",
  color: THEME_COLOR.RAW,
  icon: "lusmile",
};

export const SUBCATEGORY_FORM_BASE = {
  name: "",
  icon: "lusmile",
};
