// components/forms/ColorPicker.jsx
import React, { useState, useEffect, useRef } from "react";
import { COLOR_OPTIONS } from "../../constants/options/colorOptions";

const ColorPicker = ({
  label,
  name,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
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

  const isValidHex = (hex) => /^[A-F0-9]{6}$/i.test(hex);
  const previewColor = isValidHex(inputValue) ? `#${inputValue}` : "#CCCCCC";

  const handleChange = (hex) => {
    const formatted = hex.replace("#", "").toUpperCase();
    setInputValue(formatted);
    onChange({ target: { name, value: formatted } });
  };

  return (
    <div className={`mb-3 relative w-full ${className}`} ref={pickerRef}>
      {label && (
        <label className="block font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`w-full h-10 rounded-full border cursor-pointer border-gray-300 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{ backgroundColor: previewColor }}
        onClick={() => !disabled && setShowPalette(!showPalette)}
        title={`#${inputValue}`}
      />

      {showPalette && !disabled && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg p-3 w-full">
          <div className="grid grid-cols-8 gap-2 mb-2">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.RAW}
                type="button"
                onClick={() => {
                  handleChange(color.RAW);
                  setShowPalette(false);
                }}
                className={`${color.BG} w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  inputValue === color.RAW ? "border-black" : "border-transparent"
                }`}
                title={`#${color.RAW}`}
              />
            ))}
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              let val = e.target.value.replace(/[^a-fA-F0-9]/g, "").toUpperCase();
              if (val.length > 6) val = val.slice(0, 6);
              handleChange(val);
            }}
            placeholder="FFFFFF"
            maxLength={6}
            disabled={disabled}
            className="w-full border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...props}
          />
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}

      {inputValue && !isValidHex(inputValue) && (
        <p className="text-yellow-600 text-sm mt-1">
          Please enter a valid 6-digit hex color code
        </p>
      )}
    </div>
  );
};

export default ColorPicker;