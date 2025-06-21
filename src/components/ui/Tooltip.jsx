// components/ui/Tooltip.jsx
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Tooltip({ 
  children, 
  content, 
  position = "top", 
  delay = 300,
  className = ""
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const calculatePosition = () => {
    if (!triggerRef.current) return {};
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    
    let style = {
      position: 'fixed',
      zIndex: 9999,
      pointerEvents: 'none'
    };

    // Calculate position based on prop
    switch (position) {
      case 'right':
        style.left = triggerRect.right + 8;
        style.top = triggerRect.top + (triggerRect.height / 2);
        style.transform = 'translateY(-50%)';
        break;
      case 'left':
        style.right = window.innerWidth - triggerRect.left + 8;
        style.top = triggerRect.top + (triggerRect.height / 2);
        style.transform = 'translateY(-50%)';
        break;
      case 'bottom':
        style.left = triggerRect.left + (triggerRect.width / 2);
        style.top = triggerRect.bottom + 8;
        style.transform = 'translateX(-50%)';
        break;
      case 'top':
      default:
        style.left = triggerRect.left + (triggerRect.width / 2);
        style.bottom = window.innerHeight - triggerRect.top + 8;
        style.transform = 'translateX(-50%)';
        break;
    }

    return style;
  };

  useEffect(() => {
    if (isVisible) {
      setTooltipStyle(calculatePosition());
    }
  }, [isVisible, position]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrowClasses = () => {
    const baseClasses = "absolute w-2 h-2 bg-gray-900 rotate-45";
    
    switch (position) {
      case 'right':
        return `${baseClasses} -left-1 top-1/2 -translate-y-1/2`;
      case 'left':
        return `${baseClasses} -right-1 top-1/2 -translate-y-1/2`;
      case 'bottom':
        return `${baseClasses} -top-1 left-1/2 -translate-x-1/2`;
      case 'top':
      default:
        return `${baseClasses} -bottom-1 left-1/2 -translate-x-1/2`;
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      
      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          style={tooltipStyle}
          className={`
            bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg
            whitespace-nowrap transition-opacity duration-200 opacity-100 ${className}
          `}
        >
          <div className={getArrowClasses()} />
          {content}
        </div>,
        document.body
      )}
    </>
  );
}