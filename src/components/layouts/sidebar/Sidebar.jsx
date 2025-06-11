// components/layout/sidebar/Sidebar.jsx
import {
  PiLightbulbFilamentBold,
  PiPlusBold,
  PiSirenBold,
} from "react-icons/pi";
import { LuWandSparkles } from "react-icons/lu";
import CircleButton from "../../ui/buttons/CircleButton";
import Popover from "../../ui/Popover";
import CreateMenu from "./CreateMenu";
import { useCallback, useState } from "react";

export default function Sidebar() {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  
  const createMenuItems = ['transaction', 'menu', 'category'];

  const handleCreateClick = useCallback(() => {
    setIsCreateMenuOpen(prev => !prev);
  }, []);

  const handleCloseCreateMenu = useCallback(() => {
    setIsCreateMenuOpen(false);
  }, []);

  const handleMenuItemClick = useCallback((menuName) => {
    console.log(menuName);
    setIsCreateMenuOpen(false);
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-center overflow-y-auto px-2 gap-1`}
    >
      {/* BUTTONS */}
      <CircleButton
        icon={PiPlusBold}
        onClick={handleCreateClick}
      />
      <CircleButton
        icon={LuWandSparkles}
        onClick={handleCreateClick}
      />
      <CircleButton
        icon={PiSirenBold}
        onClick={handleCreateClick}
      />
      <CircleButton
        icon={PiLightbulbFilamentBold}
        onClick={handleCreateClick}
      />

      {/* POPOVER FOR CREATE */}
      <Popover
        isOpen={isCreateMenuOpen}
        onClose={handleCloseCreateMenu}
        position="right"
      >
        <CreateMenu
          items={createMenuItems}
          onItemClick={handleMenuItemClick}
        />
      </Popover>
    </div>
  );
}
