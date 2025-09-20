// components/menu/categories/CategoryModal.jsx
import { useState, useEffect } from "react";
import { z } from "zod";
import useUserConfigStore from "../../../stores/userConfig/userConfigStore";
import { CATEGORY_FORM_BASE } from "@/constants";
import Input from "../../forms/Input";
import ColorPicker from "../../forms/ColorPicker";
import CategoryModalButtons from "./CategoryModalButtons";
import { categorySchema } from "../../../models/categorySchema";
import IconPicker from "../../forms/IconPicker";
import CategoryTypeSelector from "../../forms/CategoryTypeSelector";

const CategoryModal = ({ onSubmit, initialData, onCancel, loading }) => {
  const { userConfig } = useUserConfigStore();

  const [form, setForm] = useState(
    CATEGORY_FORM_BASE,
  );
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setForm({
      ...CATEGORY_FORM_BASE,
      ...initialData,
    });
    setValidationErrors({});
  }, [initialData, userConfig.main_currency_code]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
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
      const validatedData = categorySchema
        .pick({
          type: true,
          name: true,
          color: true,
          icon: true,
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
        <CategoryTypeSelector
          value={form.type}
          onChange={handleChange}
          error={validationErrors.type}
          disabled={loading}
        />

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={validationErrors.name}
          disabled={loading}
          required
          autoFocus
          placeholder="Enter category name"
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

        <IconPicker
          label="Icon"
          name="icon"
          value={form.icon}
          onChange={handleChange}
          error={validationErrors.icon}
          disabled={loading}
          showPreview={true}
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