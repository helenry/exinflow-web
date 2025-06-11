// components/ui/Popover.jsx
import { useCallback } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { SIDEBAR } from '../../constants/layout';

const Popover = ({ 
  isOpen, 
  onClose, 
  children, 
  position = 'right',
  className = '',
  offset = 8 
}) => {
  const handleClickOutside = useCallback(() => {
    if (isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  const popoverRef = useClickOutside(handleClickOutside);

  if (!isOpen) return null;

  const positionClasses = {
    right: `left-${SIDEBAR.WIDTH_RAW} ml-${offset}`,
    bottom: `top-full mt-${offset}`,
  };

  return (
    <div
      ref={popoverRef}
      className={`absolute z-50 ${positionClasses[position]} ${className}`}
      style={{ 
        transform: position === 'right' 
          ? 'translateY(-50%)' 
          : 'translateX(-50%)' 
      }}
    >
      {children}
    </div>
  );
};

export default Popover;