// components/menu/categories/CategoryModal.jsx
import { useState, useEffect } from "react";
import { walletSchema } from "../../../models/walletSchema";
import { z } from "zod";
import useUserConfigStore from "../../../stores/userConfigStore";
import { WALLET_FORM_BASE, CURRENCY_OPTIONS } from "@/constants";
import Input from "../../forms/Input";
import Dropdown from "../../forms/Dropdown";
import ColorPicker from "../../forms/ColorPicker";
import CategoryModalButtons from "./CategoryModalButtons";

const CategoryModal = ({ onSubmit, initialData, onCancel, loading }) => {
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

  return (
    <>
      <div className="overflow-y-auto px-2">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={validationErrors.name}
          disabled={loading}
          required
          autoFocus
          placeholder="Enter wallet name"
        />

        <Input
          label="Base Amount"
          name="base_amount"
          type="number"
          min="0"
          step="0.01"
          value={form.base_amount}
          onChange={handleChange}
          error={validationErrors.base_amount}
          disabled={loading}
          placeholder="0.00"
        />

        <ColorPicker
          label="Color"
          name="color"
          value={form.color}
          onChange={handleChange}
          error={validationErrors.color}
          disabled={loading}
          showPreview={true}
        />

        <Dropdown
          label="Currency"
          name="currency_code"
          value={form.currency_code}
          onChange={handleChange}
          options={CURRENCY_OPTIONS}
          error={validationErrors.currency_code}
          disabled={loading}
          placeholder="Select currency"
          showSymbol={true}
          required
        />
      </div>

      <CategoryModalButtons
        validateAndSubmit={validateAndSubmit}
        onCancel={onCancel}
        loading={loading}
      />
    </>
  );
};

export default CategoryModal;