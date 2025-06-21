// /hooks/usePopover.js
import { useState, useRef, useCallback, useEffect } from 'react';

export function usePopover() {
  const [activePopover, setActivePopover] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0 });
  const buttonRefs = useRef({});

  const openPopover = useCallback((key, buttonElement) => {
    if (!buttonElement) return;
    
    const rect = buttonElement.getBoundingClientRect();
    setPopoverPosition({ top: rect.top });
    setActivePopover(key);
  }, []);

  const closePopover = useCallback(() => {
    setActivePopover(null);
  }, []);

  const togglePopover = useCallback((key, buttonElement) => {
    if (activePopover === key) {
      closePopover();
    } else {
      openPopover(key, buttonElement);
    }
  }, [activePopover, openPopover, closePopover]);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activePopover && 
          !event.target.closest('[data-popover]') && 
          !event.target.closest('[data-popover-trigger]')) {
        closePopover();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activePopover, closePopover]);

  return {
    activePopover,
    popoverPosition,
    buttonRefs,
    openPopover,
    closePopover,
    togglePopover
  };
}