// components/menu/category/subcategory/SubcategoryModal.jsx
import { useState, useEffect } from "react";
import { z } from "zod";
import { SUBCATEGORY_FORM_BASE } from "@/constants";
import Input from "../../../forms/Input";
import SubcategoryModalButtons from "./SubcategoryModalButtons";
import { subcategorySchema } from "../../../../models/subcategorySchema";
import IconPicker from "../../../forms/IconPicker";

const SubcategoryModal = ({ onSubmit, initialData, onCancel, loading }) => {
  const [form, setForm] = useState(
    SUBCATEGORY_FORM_BASE,
  );
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setForm({
      ...SUBCATEGORY_FORM_BASE,
      ...initialData,
    });
    setValidationErrors({});
  }, [initialData]);

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
      const validatedData = subcategorySchema
        .pick({
          name: true,
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

      <SubcategoryModalButtons
        validateAndSubmit={validateAndSubmit}
        onCancel={onCancel}
        loading={loading}
      />
    </>
  );
};

export default SubcategoryModal;