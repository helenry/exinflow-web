// components/layout/navbar/Navbar.jsx
import AccountPopover from "./AccountPopover";
import { NAVBAR } from "@/constants";
import logo_color from "../../../assets/images/logo/logo_color.png";
import Menus from "./Menus";
import { LuBell } from "react-icons/lu";
import CircleButton from "../../ui/buttons/CircleButton";
import { PiGearSix, PiGearSixBold } from "react-icons/pi";
import Tooltip from "../../ui/Tooltip";

export default function Navbar() {
  return (
    <div
      className={`${NAVBAR.HEIGHT} fixed w-full px-6 flex justify-between items-center gap-4`}
    >
      <img src={logo_color} alt="Exinflow" className="h-5 object-contain" />

      <Menus />

      <div className="flex items-center gap-3">
        <Tooltip
          key={`navbar-settings`}
          content="Settngs"
          position="bottom"
          delay={500}
        >
          <CircleButton
            icon={PiGearSixBold}
            onClick={() => console.log("Clicked!")}
          />
        </Tooltip>

        <Tooltip
          key={`navbar-notifications`}
          content="Notifications"
          position="bottom"
          delay={500}
        >
          <CircleButton icon={LuBell} onClick={() => console.log("Clicked!")} />
        </Tooltip>
        <AccountPopover />
      </div>
    </div>
  );
}
