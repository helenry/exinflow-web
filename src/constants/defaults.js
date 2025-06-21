// constants/defaults.js
import { THEME_COLOR } from "./colors";
import { TRANSACTION_TYPES } from "./types";

export const DEFAULT_CREATOR = "system";
export const DEFAULT_CURRENCY = "IDR";

export const DEFAULT_WALLET = {
  name: "Cash",
  base_amount: 0,
  amount: 0,
  color: THEME_COLOR.RAW,
};

export const DEFAULT_CATEGORIES = [
  // EXPENSE
  {
    name: "Foods & Drinks",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
    subcategories: [
      {
        name: "Groceries",
        icon: "",
      },
      {
        name: "Restaurants & Café",
        icon: "",
      },
    ],
  },
  {
    name: "Transportation",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
    subcategories: [
      {
        name: "Motorcycle",
        icon: "",
      },
      {
        name: "Car",
        icon: "",
      },
      {
        name: "Bus",
        icon: "",
      },
      {
        name: "Train",
        icon: "",
      },
      {
        name: "Ship",
        icon: "",
      },
      {
        name: "Plane",
        icon: "",
      },
    ],
  },
  {
    name: "Entertainment",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
    subcategories: [
      {
        name: "Game",
        icon: "",
      },
      {
        name: "Movie",
        icon: "",
      },
    ],
  },
  {
    name: "Gifts & Donations",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
    subcategories: [
      {
        name: "Giving",
        icon: "",
      },
      {
        name: "Wedding",
        icon: "",
      },
      {
        name: "Funeral",
        icon: "",
      },
    ],
  },
  {
    name: "Bills",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
    subcategories: [
      {
        name: "Elecrticity",
        icon: "",
      },
      {
        name: "Water",
        icon: "",
      },
      {
        name: "Internet",
        icon: "",
      },
    ],
  },
  {
    name: "Home & Family",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
    subcategories: [
      {
        name: "Children",
        icon: "",
      },
      {
        name: "Pets",
        icon: "",
      },
      {
        name: "Furniture",
        icon: "",
      },
    ],
  },
  {
    name: "Health & Wellness",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
    subcategories: [
      {
        name: "Drugs",
        icon: "",
      },
      {
        name: "Sports",
        icon: "",
      },
      {
        name: "Personal Care",
        icon: "",
      },
    ],
  },
  {
    name: "Shopping",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
    subcategories: [
      {
        name: "Clothes",
        icon: "",
      },
      {
        name: "Electronics",
        icon: "",
      },
    ],
  },
  {
    name: "Vacation",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
  },
  {
    name: "Education",
    type: TRANSACTION_TYPES.EXPENSE,
    icon: "",
  },

  // INCOME
  {
    name: "Salary",
    type: TRANSACTION_TYPES.INCOME,
    icon: "",
    subcategories: [
      {
        name: "Bonus",
        icon: "",
      },
    ],
  },
  {
    name: "Gift",
    type: TRANSACTION_TYPES.INCOME,
    icon: "",
  },
  {
    name: "Retirement",
    type: TRANSACTION_TYPES.INCOME,
    icon: "",
  },
  {
    name: "Profit",
    type: TRANSACTION_TYPES.INCOME,
    icon: "",
  },
];
