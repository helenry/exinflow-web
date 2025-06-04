// components/layout/sidebar/CircleButton.jsx
import React from "react";

export default function CircleButton({
  icon: Icon,
  imageSrc,
  onClick,
  size = 42,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-full bg-white transition cursor-pointer text-gray-600"
      style={{ width: size, height: size }}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="button"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        Icon && <Icon size={18} />
      )}
    </button>
  );
}
