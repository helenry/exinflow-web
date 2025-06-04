// components/menu/wallets/WalletModal.jsx
import React, { useState, useEffect } from 'react';
import { walletSchema } from '../../../models/walletSchema';
import { z } from 'zod';
import { THEME_COLOR } from '../../../constants/colors';

const WalletModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
  error,
}) => {
  const [form, setForm] = useState({
    name: '',
    base_amount: 0,
    amount: 0,
    color: THEME_COLOR.RAW,
    currency_code: 'IDR',
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setForm({
      name: '',
      base_amount: 0,
      amount: 0,
      color: THEME_COLOR.RAW,
      currency_code: 'IDR',
      ...initialData,
    });
    setValidationErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'base_amount' ? Number(value) : value,
    }));
  };

  const handleCurrencyChange = e => {
    setForm(prev => ({
      ...prev,
      currency_code: e.target.value.toUpperCase(),
    }));
  };

  const handleSubmit = () => {
    try {
      walletSchema
        .pick({
          name: true,
          base_amount: true,
          amount: true,
          color: true,
          currency_code: true,
        })
        .parse(form);

      onSubmit(form);
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errs = {};
        e.errors.forEach(err => {
          if (err.path[0]) errs[err.path[0]] = err.message;
        });
        setValidationErrors(errs);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit Wallet' : 'Create Wallet'}
        </h2>

        <div className="mb-3">
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
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
            className="border rounded px-2 py-1 w-full"
          />
          {validationErrors.base_amount && (
            <p className="text-red-600 text-sm">
              {validationErrors.base_amount}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label className="block font-medium">Color (Hex, e.g. ffffff)</label>
          <input
            name="color"
            maxLength={6}
            value={form.color}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
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
            className="border rounded px-2 py-1 w-full uppercase"
          />
          {validationErrors.currency_code && (
            <p className="text-red-600 text-sm">
              {validationErrors.currency_code}
            </p>
          )}
        </div>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;