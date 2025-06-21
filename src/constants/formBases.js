// constants/formBases.js
import { THEME_COLOR } from "./colors";

export const WALLET_FORM_BASE = (mainCurrencyCode) => ({
  name: "",
  base_amount: 0,
  color: THEME_COLOR.RAW,
  currency_code: mainCurrencyCode,
});
