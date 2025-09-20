// components/forms/CategoryTypeSelector.jsx
import React from "react";

export default function CategoryTypeSelector({ value, onChange, error, disabled }) {
  const options = [
    { label: "Expense", value: "expense", color: "bg-red-500" },
    { label: "Income", value: "income", color: "bg-green-500" },
  ];

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Type <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-3">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              onClick={() =>
                onChange({ target: { name: "type", value: opt.value } })
              }
              className={`flex-1 py-2 rounded-lg border text-center font-semibold transition-all duration-200
                ${isActive
                  ? `${opt.color} text-white border-transparent shadow-lg scale-105`
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"}
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
}
