// /constants/uis.js
import { LuWandSparkles } from "react-icons/lu";
import { PiLightbulbFilamentBold, PiPlusBold, PiSirenBold } from "react-icons/pi";
import { createWalletHandler } from "../handlers/walletHandlers";
import { ICONS } from "./icons";

export const SIDEBAR_BUTTONS = [
  {
    key: "add",
    icon: ICONS.ADD,
    name: "Add New Item",
    menu: [
      // {
      //   id: "transaction",
      //   label: "Transaction",,
      //   onClick: 
      // },
      // {
      //   id: "budget",
      //   label: "Budget",
      //   onClick: 
      // },
      // {
      //   id: "credit",
      //   label: "Credit",
      //   onClick: 
      // },
      // {
      //   id: "saving",
      //   label: "Saving",
      //   onClick: 
      // },
      // {
      //   id: "investment",
      //   label: "Investment",
      //   onClick: 
      // },
      {
        id: "wallet",
        label: "Wallet",
        onClick: createWalletHandler
      },
      // {
      //   id: "category",
      //   label: "Category",
      //   onClick: 
      // },
    ]
  },
  // {
  //   key: "ai",
  //   icon: LuWandSparkles,
  //   name: "Open AI Assistant",
  //   onClick: 
  // },
  // {
  //   key: "report",
  //   icon: PiSirenBold,
  //   name: "Report an Issue",
  //   onClick: 
  // },
  // {
  //   key: "idea",
  //   icon: PiLightbulbFilamentBold,
  //   name: "Share an Idea",
  //   onClick: 
  // }
]