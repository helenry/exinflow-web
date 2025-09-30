// /constants/uis.js
import { LuWandSparkles } from "react-icons/lu";
import {
  PiLightbulbFilamentBold,
  PiPlusBold,
  PiSirenBold,
} from "react-icons/pi";
import { ICONS } from "./icons";

export const SIDEBAR_BUTTONS = [
  {
    key: "add",
    icon: ICONS.ADD,
    name: "Add New Item",
    menu: [
      {
        id: "transaction",
        label: "Transaction",
      },
      // {
      //   id: "budget",
      //   label: "Budget",
      // },
      // {
      //   id: "credit",
      //   label: "Credit",
      // },
      // {
      //   id: "saving",
      //   label: "Saving",
      // },
      // {
      //   id: "investment",
      //   label: "Investment",
      // },
      {
        id: "wallet",
        label: "Wallet",
      },
      {
        id: "category",
        label: "Category",
      },
    ],
  },
  {
    key: "ai",
    icon: LuWandSparkles,
    name: "Open AI Assistant",
  },
  // {
  //   key: "report",
  //   icon: PiSirenBold,
  //   name: "Report an Issue",
  // },
  // {
  //   key: "idea",
  //   icon: PiLightbulbFilamentBold,
  //   name: "Share an Idea",
  // }
];
