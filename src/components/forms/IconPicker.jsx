// components/forms/IconPicker.jsx
import React, { useState, useEffect, useRef } from "react";
import { ICON_OPTIONS } from "../../constants/options/iconOptions";

const IconPicker = ({
  label,
  name,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
  showPreview = true,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [showPalette, setShowPalette] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPalette(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isValidIcon = (iconKey) => iconKey && ICON_OPTIONS[iconKey];
  const IconComponent = isValidIcon(inputValue)
    ? ICON_OPTIONS[inputValue]
    : null;

  const handleChange = (iconKey) => {
    setInputValue(iconKey);
    onChange({ target: { name, value: iconKey } });
  };

  const iconEntries = Object.entries(ICON_OPTIONS);

  return (
    <div className={`mb-3 relative w-full ${className}`} ref={pickerRef}>
      {label && (
        <label className="block font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`w-full h-10 rounded-full border border-gray-300 cursor-pointer flex items-center justify-center bg-white hover:bg-gray-50 ${
          disabled ? "opacity-50 cursor-not-allowed hover:bg-white" : ""
        }`}
        onClick={() => !disabled && setShowPalette(!showPalette)}
        title={inputValue || "Select an icon"}
      >
        {showPreview && IconComponent ? (
          <IconComponent size={20} className="text-gray-700" />
        ) : (
          <span className="text-gray-400 text-sm">
            {inputValue || "Choose icon"}
          </span>
        )}
      </div>

      {showPalette && !disabled && (
        <div className="absolute z-10 mt-2 bg-white rounded-2xl shadow-lg p-3 w-full h-48 overflow-y-auto">
          <div className="grid grid-cols-6 gap-2 place-items-center">
            {iconEntries.map(([iconKey, IconComp]) => (
              <button
                key={iconKey}
                type="button"
                onClick={() => {
                  handleChange(iconKey);
                  setShowPalette(false);
                }}
                className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all hover:scale-110 hover:bg-gray-50 ${
                  inputValue === iconKey
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                title={iconKey}
              >
                <IconComp size={18} className="text-gray-700" />
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

      {inputValue && !isValidIcon(inputValue) && (
        <p className="text-yellow-600 text-sm mt-1">
          Icon "{inputValue}" not found. Please select from available options.
        </p>
      )}
    </div>
  );
};

export default IconPicker;
