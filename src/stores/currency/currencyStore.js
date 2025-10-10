// stores/currency/currencyStore.js
import { create } from "zustand";
import { currencyActions } from "./currencyActions";

const useCurrencyStore = create((set, get) => ({
  // State
  rates: null, // { base_currency, rates: {}, last_updated_at, from_cache }
  loading: false,
  error: null,
  lastFetchTime: null,

  // Actions
  ...currencyActions(set, get),
}));

export default useCurrencyStore;
