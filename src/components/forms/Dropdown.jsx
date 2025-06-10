// components/forms/Dropdown.jsx
import React from "react";
import Select from "react-select";

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
  const renderOption = (option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }

    if (option.iso_code && option.name) {
      const label = showSymbol && option.symbol
        ? `${option.iso_code} - ${option.name} (${option.symbol})`
        : `${option.iso_code} - ${option.name}`;
      return { value: option.iso_code, label };
    }

    if (option.value && option.label) {
      return option;
    }

    return { value: option.toString(), label: option.toString() };
  };

  const selectOptions = options.map(renderOption);

  // Find selected option
  const selectedOption = selectOptions.find(opt => opt.value === value) || null;

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="block font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Select
        name={name}
        value={selectedOption}
        onChange={(selected) => onChange({ target: { name, value: selected?.value || "" } })}
        options={selectOptions}
        isDisabled={disabled}
        placeholder={placeholder}
        classNames={{
          control: () => `border ${error ? "border-red-500" : "border-gray-300"} rounded`,
        }}
        {...props}
      />
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;
