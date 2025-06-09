// components/layout/navbar/MenuItem.jsx
import { NavLink } from "react-router-dom";
import { THEME_COLOR } from "@/constants";

export default function MenuItem({ label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 h-8 rounded-full transition-colors ${
          isActive
            ? `${THEME_COLOR.BG} text-white`
            : `${THEME_COLOR.TEXT} ${THEME_COLOR.BG_HOVER}`
        }`
      }
    >
      <span className="whitespace-nowrap text-sm font-medium">{label}</span>
    </NavLink>
  );
}
