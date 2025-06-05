// components/menu/wallets/WalletModal.jsx
import React, { useState, useEffect } from "react";
import { walletSchema } from "../../../models/walletSchema";
import { z } from "zod";
import { THEME_COLOR } from "../../../constants/colors";
import useUserConfigStore from "../../../stores/userConfigStore";
import { WALLET_FORM_BASE } from "../../../constants/form_bases";

const WalletModal = ({ onSubmit, initialData }) => {
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
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "base_amount" ? Number(value) : value,
    }));
  };

  const handleCurrencyChange = (e) => {
    setForm((prev) => ({
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
          color: true,
          currency_code: true,
        })
        .parse(form);

      onSubmit(form);
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

  // Listen for submit event from parent modal
  useEffect(() => {
    const formElement = document.querySelector("[data-modal-form]");
    if (formElement) {
      const handleModalSubmit = () => {
        handleSubmit();
      };
      formElement.addEventListener("modalSubmit", handleModalSubmit);
      return () =>
        formElement.removeEventListener("modalSubmit", handleModalSubmit);
    }
  }, [form]);

  return (
    <div data-modal-form>
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
    </div>
  );
};

export default WalletModal;
