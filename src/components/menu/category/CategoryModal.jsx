// components/menu/category/CategoryModal.jsx
import { CATEGORY_FORM_BASE } from "@/constants";
import Input from "../../forms/Input";
import ColorPicker from "../../forms/ColorPicker";
import { categorySchema } from "../../../models/categorySchema";
import IconPicker from "../../forms/IconPicker";
import CategoryTypeSelector from "../../forms/CategoryTypeSelector";
import ModalButtons from "../../layouts/modal/ModalButtons";
import { useModalForm } from "../../../hooks/useModalForm";

const CategoryModal = ({ onSubmit, initialData, onCancel, loading }) => {
  const validationFields = {
    type: true,
    name: true,
    color: true,
    icon: true,
  };

  const { form, validationErrors, handleChange, validateAndSubmit } =
    useModalForm(
      CATEGORY_FORM_BASE,
      categorySchema,
      validationFields,
      initialData,
    );

  return (
    <>
      <div className="overflow-y-auto px-2">
        <CategoryTypeSelector
          label="Type"
          name="type"
          value={form.type}
          onChange={handleChange}
          error={validationErrors.type}
          required
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

      <ModalButtons
        onSubmit={() => validateAndSubmit(onSubmit)}
        onCancel={onCancel}
        loading={loading}
      />
    </>
  );
};

export default CategoryModal;
