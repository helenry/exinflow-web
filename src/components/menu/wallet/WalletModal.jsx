// components/menu/wallet/WalletModal.jsx
import { walletSchema } from "../../../models/walletSchema";
import useUserConfigStore from "../../../stores/userConfig/userConfigStore";
import { WALLET_FORM_BASE, CURRENCY_OPTIONS } from "@/constants";
import Input from "../../forms/Input";
import Dropdown from "../../forms/Dropdown";
import ColorPicker from "../../forms/ColorPicker";
import ModalButtons from "../../layouts/modal/ModalButtons";
import { useModalForm } from "../../../hooks/useModalForm";

const WalletModal = ({ onSubmit, initialData, onCancel, loading }) => {
  const { userConfig } = useUserConfigStore();

  const validationFields = {
    name: true,
    base_amount: true,
    color: true,
    currency_code: true,
  };

  const { form, validationErrors, handleChange, validateAndSubmit } =
    useModalForm(
      WALLET_FORM_BASE(userConfig.main_currency_code),
      walletSchema,
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

      <ModalButtons
        onSubmit={() => validateAndSubmit(onSubmit)}
        onCancel={onCancel}
        loading={loading}
      />
    </>
  );
};

export default WalletModal;
