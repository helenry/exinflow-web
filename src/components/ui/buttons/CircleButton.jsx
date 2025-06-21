// components/layout/sidebar/CircleButton.jsx
import React from "react";

export default function CircleButton({
  icon: Icon,
  imageSrc,
  onClick,
  size = 42,
  iconSize = 18,
  isActive = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-full transition cursor-pointer ${
        isActive 
          ? 'bg-blue-100 text-blue-600 shadow-md' 
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
      style={{ width: size, height: size }}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="button"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        Icon && <Icon size={iconSize} />
      )}
    </button>
  );
}