// components/menu/category/subcategory/SubcategoryModal.jsx
import { SUBCATEGORY_FORM_BASE } from "@/constants";
import Input from "../../../forms/Input";
import { subcategorySchema } from "../../../../models/subcategorySchema";
import IconPicker from "../../../forms/IconPicker";
import ModalButtons from "../../../layouts/modal/ModalButtons";
import { useModalForm } from "../../../../hooks/useModalForm";

const SubcategoryModal = ({ onSubmit, initialData, onCancel, loading }) => {
  const validationFields = {
    name: true,
    icon: true,
  };

  const { form, validationErrors, handleChange, validateAndSubmit } =
    useModalForm(
      SUBCATEGORY_FORM_BASE,
      subcategorySchema,
      validationFields,
      initialData,
    );

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
          placeholder="Enter subcategory name"
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

export default SubcategoryModal;
