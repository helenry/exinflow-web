// components/layout/sidebar/Sidebar.jsx
import { SIDEBAR_BUTTONS } from "../../../constants";
import CreateMenu from "./CreateMenu";
import Popover from "../../ui/Popover";
import Tooltip from "../../ui/Tooltip";
import CircleButton from "../../ui/buttons/CircleButton";
import useModalStore from "../../../stores/modal/modalStore";
import { usePopover } from "../../../hooks/usePopover";

export default function Sidebar() {
  const {
    activePopover,
    popoverPosition,
    buttonRefs,
    togglePopover,
    closePopover,
  } = usePopover();

  const { openModal } = useModalStore();

  const handleButtonClick = (button) => {
    if (button.menu) {
      const buttonKey = button.key;
      togglePopover(buttonKey, buttonRefs.current[buttonKey]);
    } else {
      // For direct buttons without menu
      openModal({
        type: button.id,
        action: "create",
      });
    }
  };

  const handleMenuItemClick = (item) => {
    openModal({
      type: item.id,
      action: "create",
    });
    closePopover();
  };

  const activeConfig = SIDEBAR_BUTTONS.find(
    (item) => item.key === activePopover,
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center overflow-y-auto px-2 gap-1">
        {SIDEBAR_BUTTONS.map((button) => (
          <Tooltip
            key={`sidebar-${button.key}`}
            content={button.name}
            position="right"
            delay={500}
          >
            <div
              ref={(el) => (buttonRefs.current[button.key] = el)}
              {...(button.menu && {
                "data-popover-trigger": true,
              })}
            >
              <CircleButton
                icon={button.icon}
                onClick={() => handleButtonClick(button)}
                isActive={activePopover === button.key}
              />
            </div>
          </Tooltip>
        ))}
      </div>

      <Popover
        isOpen={!!activePopover && !!activeConfig?.menu}
        position={popoverPosition}
        onClose={closePopover}
      >
        {activeConfig?.menu && (
          <CreateMenu
            title={activeConfig.name}
            items={activeConfig.menu}
            onClose={closePopover}
            onItemClick={handleMenuItemClick}
          />
        )}
      </Popover>
    </>
  );
}
