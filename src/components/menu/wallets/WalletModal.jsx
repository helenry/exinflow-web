// components/menu/wallets/WalletModal.jsx
import React, { useState, useEffect } from "react";
import { walletSchema } from "../../../models/walletSchema";
import { z } from "zod";
import { THEME_COLOR } from "../../../constants/colors";
import useUserConfigStore from "../../../stores/userConfigStore";
import { WALLET_FORM_BASE } from "../../../constants/form_bases";

const WalletModal = ({ onSubmit, initialData, onCancel, loading }) => {
  const { userConfig } = useUserConfigStore();

  const [form, setForm] = useState(
    WALLET_FORM_BASE(userConfig.main_currency_code),
  );
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setForm({
      ...WALLET_FORM_BASE(userConfig.main_currency_code),
      ...initialData,
    });
    setValidationErrors({});
  }, [initialData, userConfig.main_currency_code]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "base_amount" ? Number(value) : value,
    }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCurrencyChange = (e) => {
    setForm((prev) => ({
      ...prev,
      currency_code: e.target.value.toUpperCase(),
    }));
    
    // Clear validation error for currency_code when user starts typing
    if (validationErrors.currency_code) {
      setValidationErrors(prev => ({
        ...prev,
        currency_code: undefined
      }));
    }
  };

  const validateAndSubmit = () => {
    try {
      const validatedData = walletSchema
        .pick({
          name: true,
          base_amount: true,
          color: true,
          currency_code: true,
        })
        .parse(form);

      setValidationErrors({});
      onSubmit(validatedData);
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errs = {};
        e.errors.forEach((err) => {
          if (err.path[0]) errs[err.path[0]] = err.message;
        });
        setValidationErrors(errs);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      validateAndSubmit();
    }
    if (e.key === 'Escape' && !loading) {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <div onKeyDown={handleKeyPress}>
      <div className="mb-3">
        <label className="block font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          className="border rounded px-2 py-1 w-full disabled:bg-gray-100"
          autoFocus
        />
        {validationErrors.name && (
          <p className="text-red-600 text-sm">{validationErrors.name}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Base Amount</label>
        <input
          name="base_amount"
          type="number"
          min="0"
          step="0.01"
          value={form.base_amount}
          onChange={handleChange}
          disabled={loading}
          className="border rounded px-2 py-1 w-full disabled:bg-gray-100"
        />
        {validationErrors.base_amount && (
          <p className="text-red-600 text-sm">{validationErrors.base_amount}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Color (Hex, e.g. ffffff)</label>
        <input
          name="color"
          maxLength={6}
          value={form.color}
          onChange={handleChange}
          disabled={loading}
          className="border rounded px-2 py-1 w-full disabled:bg-gray-100"
        />
        {validationErrors.color && (
          <p className="text-red-600 text-sm">{validationErrors.color}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Currency Code (3 letters)</label>
        <input
          name="currency_code"
          maxLength={3}
          value={form.currency_code}
          onChange={handleCurrencyChange}
          disabled={loading}
          className="border rounded px-2 py-1 w-full uppercase disabled:bg-gray-100"
        />
        {validationErrors.currency_code && (
          <p className="text-red-600 text-sm">
            {validationErrors.currency_code}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={validateAndSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default WalletModal;