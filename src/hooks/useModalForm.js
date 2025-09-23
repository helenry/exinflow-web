// hooks/useModalForm.js
import { useState, useEffect } from "react";
import { z } from "zod";

export const useModalForm = (
  initialFormBase,
  schemaOrValidator,
  validationFields,
  initialData,
) => {
  const [form, setForm] = useState(initialFormBase);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setForm({
      ...initialFormBase,
      ...initialData,
    });
    setValidationErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "base_amount" || name === "amount" ? 
          (value === "" ? "" : Number(value)) : 
          value,
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateAndSubmit = (onSubmit) => {
    try {
      let validatedData;

      // Check if it's a function (new transaction pattern) or Zod schema (old pattern)
      if (typeof schemaOrValidator === "function") {
        validatedData = schemaOrValidator(form);
      } else {
        validatedData = schemaOrValidator.pick(validationFields).parse(form);
      }

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

  return {
    form,
    validationErrors,
    handleChange,
    validateAndSubmit,
  };
};