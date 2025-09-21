// components/forms/TypeSelector.jsx
import React from "react";

const TypeSelector = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex gap-3">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              onClick={() => onChange({ target: { name, value: opt.value } })}
              className={`flex-1 py-2 rounded-full border text-center font-semibold transition-all duration-200
                ${
                  isActive
                    ? `${opt.color} text-white border-transparent shadow-lg scale-105`
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TypeSelector;