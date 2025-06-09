// components/forms/Input.jsx
import React from "react";

const Input = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  disabled = false,
  required = false,
  autoFocus = false,
  min,
  max,
  step,
  maxLength,
  className = "",
  ...props
}) => {
  const baseClassName = "border rounded px-2 py-1 w-full";
  const stateClassName = disabled 
    ? "disabled:bg-gray-100 disabled:cursor-not-allowed" 
    : "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const errorClassName = error ? "border-red-500" : "border-gray-300";
  
  const inputClassName = `${baseClassName} ${stateClassName} ${errorClassName} ${className}`;

  return (
    <div className="mb-3">
      {label && (
        <label className="block font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        className={inputClassName}
        {...props}
      />
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;