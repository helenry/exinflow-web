// components/ui/Popover.jsx
import React from "react";

export default function Popover({
  isOpen,
  position = { top: 0 },
  children,
  className = "",
  style = {},
  onClose,
}) {
  if (!isOpen) return null;

  const defaultStyle = {
    top: position.top,
    ...style,
  };

  return (
    <div
      className={`fixed left-16 z-5000 w-42 bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`}
      style={defaultStyle}
      data-popover
    >
      {children}
    </div>
  );
}
