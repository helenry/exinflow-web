// components/forms/Dropdown.jsx
import React from "react";

const Dropdown = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  placeholder = "Select an option",
  disabled = false,
  required = false,
  showSymbol = false,
  className = "",
  ...props
}) => {
  const baseClassName = "border rounded px-2 py-1 w-full";
  const stateClassName = disabled 
    ? "disabled:bg-gray-100 disabled:cursor-not-allowed" 
    : "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const errorClassName = error ? "border-red-500" : "border-gray-300";
  
  const selectClassName = `${baseClassName} ${stateClassName} ${errorClassName} ${className}`;

  const renderOption = (option) => {
    if (typeof option === 'string') {
      return option;
    }
    
    // For currency options with iso_code, name, and symbol
    if (option.iso_code && option.name) {
      return showSymbol && option.symbol 
        ? `${option.iso_code} - ${option.name} (${option.symbol})`
        : `${option.iso_code} - ${option.name}`;
    }
    
    // For simple objects with value and label
    if (option.value && option.label) {
      return option.label;
    }
    
    return option.toString();
  };

  const getOptionValue = (option) => {
    if (typeof option === 'string') {
      return option;
    }
    
    if (option.iso_code) {
      return option.iso_code;
    }
    
    if (option.value) {
      return option.value;
    }
    
    return option.toString();
  };

  return (
    <div className="mb-3">
      {label && (
        <label className="block font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={selectClassName}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option 
            key={getOptionValue(option) || index} 
            value={getOptionValue(option)}
          >
            {renderOption(option)}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;