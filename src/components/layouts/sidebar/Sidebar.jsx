// components/layout/sidebar/Sidebar.jsx
import React from 'react';
import { usePopover } from '../../../hooks/usePopover';
import { SIDEBAR_BUTTONS } from "../../../constants";
import Popover from '../../ui/Popover';
import CreateMenu from './CreateMenu';
import Tooltip from '../../ui/Tooltip';
import CircleButton from '../../ui/buttons/CircleButton';
import useModalStore from '../../../stores/modalStore';

export default function Sidebar() {
  const {
    activePopover,
    popoverPosition,
    buttonRefs,
    togglePopover,
    closePopover
  } = usePopover();
  const { openModal } = useModalStore();

  const executeHandler = (onClick) => {
    const handler = onClick(openModal);
    handler();
  };

  const handleButtonClick = (button) => {
    if (button.menu) {
      const buttonKey = button.key;
      togglePopover(buttonKey, buttonRefs.current[buttonKey]);
    } else {
      executeHandler(button.onClick);
    }
  };

  const handleMenuItemClick = (item) => {
    executeHandler(item.onClick);
    closePopover();
  };

  const activeConfig = SIDEBAR_BUTTONS.find(item => item.key === activePopover);

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
                'data-popover-trigger': true, // Also fixed this attribute name
              })}
            >
              <CircleButton
                icon={button.icon}
                onClick={() => handleButtonClick(button)} // Removed the event parameter
                isActive={activePopover === button.key}
              />
            </div>
          </Tooltip>
        ))}
      </div>

      <Popover
        isOpen={!!activePopover && !!activeConfig?.menu} // FIXED: Changed from hasMenu to menu
        position={popoverPosition}
        onClose={closePopover}
      >
        {activeConfig?.menu && (
          <CreateMenu
            title={activeConfig.name}
            items={activeConfig.menu} // FIXED: Changed from menuItems to menu
            onClose={closePopover}
            onItemClick={handleMenuItemClick}
          />
        )}
      </Popover>
    </>
  );
}