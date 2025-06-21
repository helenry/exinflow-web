// /components/layout/sidebar/CreateMenu.jsx
import React from 'react';
import { PiXBold } from 'react-icons/pi';

export default function CreateMenu({ 
  title, 
  items = [], 
  onClose, 
  onItemClick 
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <PiXBold size={14} className="text-gray-500" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors text-sm cursor-pointer"
          >
            <span className="text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}