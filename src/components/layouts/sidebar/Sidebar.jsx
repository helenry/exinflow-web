// components/layout/sidebar/Sidebar.jsx
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NAVBAR, SIDEBAR } from "../../../constants/layout";
import {
  PiLightbulbFilamentBold,
  PiPlus,
  PiPlusBold,
  PiSiren,
  PiSirenBold,
} from "react-icons/pi";
import { TbPlus } from "react-icons/tb";
import { LuPlus, LuSparkles, LuWand, LuWandSparkles } from "react-icons/lu";
import CircleButton from "../../buttons/CircleButton";

export default function Sidebar() {
  return (
    <div
      className={`flex flex-col justify-center items-center overflow-y-auto px-2 gap-1`}
    >
      <CircleButton icon={PiPlusBold} onClick={() => console.log("Clicked!")} />
      <CircleButton
        icon={LuWandSparkles}
        onClick={() => console.log("Clicked!")}
      />
      <CircleButton
        icon={PiSirenBold}
        onClick={() => console.log("Clicked!")}
      />
      <CircleButton
        icon={PiLightbulbFilamentBold}
        onClick={() => console.log("Clicked!")}
      />
    </div>
  );
}
