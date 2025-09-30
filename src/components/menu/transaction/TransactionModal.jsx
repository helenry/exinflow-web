// components/menu/transaction/TransactionModal.jsx
import { TRANSACTION_FORM_BASE } from "@/constants";
import Input from "../../forms/Input";
import Dropdown from "../../forms/Dropdown";
import ModalButtons from "../../layouts/modal/ModalButtons";
import { useModalForm } from "../../../hooks/useModalForm";
import useCategoryStore from "../../../stores/category/categoryStore";
import useWalletStore from "../../../stores/wallet/walletStore";
import { useEffect, useState, useMemo } from "react";
import { TRANSACTION_TYPE_OPTIONS } from "../../../constants/options/transactionTypeOptions";
import { TRANSACTION_TYPES } from "../../../constants";
import TypeSelector from "../../forms/TypeSelector";
import { validateTransactionByType } from "../../../models/transactionSchema";
import useAuthStore from "../../../stores/auth/authStore";

const TransactionModal = ({ onSubmit, initialData, onCancel, loading }) => {
  const { currentUser } = useAuthStore();
  const {
    categories,
    setCurrentUser: setCategoryCurrentUser,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryStore();

  const {
    wallets,
    setCurrentUser: setWalletCurrentUser,
    loading: walletLoading,
    error: walletError,
  } = useWalletStore();

  useEffect(() => {
    setCategoryCurrentUser(currentUser?.uid);
    setWalletCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCategoryCurrentUser, setWalletCurrentUser]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const { form, validationErrors, handleChange, validateAndSubmit } =
    useModalForm(
      TRANSACTION_FORM_BASE,
      validateTransactionByType,
      {}, // Not used since validateTransactionByType is a function
      initialData,
    );

  // Filter categories based on transaction type
  const filteredCategories = useMemo(() => {
    if (form.type === TRANSACTION_TYPES.INCOME) {
      return categories.filter(
        (category) => category.type === TRANSACTION_TYPES.INCOME,
      );
    }
    if (form.type === TRANSACTION_TYPES.EXPENSE) {
      return categories.filter(
        (category) => category.type === TRANSACTION_TYPES.EXPENSE,
      );
    }
    // For TRANSFER type, no categories are shown
    return [];
  }, [categories, form.type]);

  // Handle category selection and update subcategory options
  useEffect(() => {
    if (form.category_id) {
      const category = filteredCategories.find(
        (cat) => cat.id === form.category_id,
      );
      setSelectedCategory(category);

      // Clear subcategory if it doesn't belong to selected category
      if (form.subcategory_id && category) {
        const validSubcategory = category.subcategories?.find(
          (sub) => sub.id === form.subcategory_id,
        );
        if (!validSubcategory) {
          handleChange({ target: { name: "subcategory_id", value: "" } });
        }
      }
    } else {
      setSelectedCategory(null);
      handleChange({ target: { name: "subcategory_id", value: "" } });
    }
  }, [form.category_id, filteredCategories, form.subcategory_id, handleChange]);

  // Clear category and subcategory when transaction type changes
  useEffect(() => {
    // Only clear if current category doesn't match the new transaction type
    if (form.category_id) {
      const currentCategory = categories.find(
        (cat) => cat.id === form.category_id,
      );
      if (currentCategory && currentCategory.type !== form.type) {
        handleChange({ target: { name: "category_id", value: "" } });
        handleChange({ target: { name: "subcategory_id", value: "" } });
      }
    }
  }, [form.type, form.category_id, categories, handleChange]);

  // Prepare wallet options
  const walletOptions = wallets.map((wallet) => ({
    value: wallet.id,
    label: wallet.name,
    symbol: wallet.currency_code, // Can show currency if needed
  }));

  // Prepare category options (now using filtered categories)
  const categoryOptions = filteredCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // Prepare subcategory options based on selected category
  const subcategoryOptions =
    selectedCategory?.subcategories?.map((subcategory) => ({
      value: subcategory.id,
      label: subcategory.name,
    })) || [];

  // Filter source wallet options for transfers (exclude destination)
  const sourceWalletOptions = walletOptions.filter(
    (wallet) => wallet.value !== form.destination_wallet_id,
  );

  // Filter destination wallet options for transfers (exclude source)
  const destinationWalletOptions = walletOptions.filter(
    (wallet) => wallet.value !== form.source_wallet_id,
  );

  const isIncomeOrExpense =
    form.type === TRANSACTION_TYPES.INCOME ||
    form.type === TRANSACTION_TYPES.EXPENSE;
  const isTransfer = form.type === TRANSACTION_TYPES.TRANSFER;

  return (
    <>
      <div className="overflow-y-auto px-2">
        <TypeSelector
          label="Transaction Type"
          name="type"
          value={form.type}
          onChange={handleChange}
          options={TRANSACTION_TYPE_OPTIONS}
          error={validationErrors.type}
          disabled={loading}
          required
        />

        <Input
          label="Amount"
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          error={validationErrors.amount}
          disabled={loading}
          placeholder="0.00"
          required
        />

        <Input
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          error={validationErrors.date}
          disabled={loading}
          required
        />

        {/* Wallet Selection for Income/Expense */}
        {isIncomeOrExpense && (
          <Dropdown
            label="Wallet"
            name="wallet_id"
            value={form.wallet_id}
            onChange={handleChange}
            options={walletOptions}
            error={validationErrors.wallet_id}
            disabled={loading || walletOptions.length === 0}
            placeholder="Select wallet"
            required
          />
        )}

        {/* Source and Destination Wallets for Transfer */}
        {isTransfer && (
          <>
            <Dropdown
              label="From Wallet"
              name="source_wallet_id"
              value={form.source_wallet_id}
              onChange={handleChange}
              options={sourceWalletOptions}
              error={validationErrors.source_wallet_id}
              disabled={loading || walletOptions.length < 2}
              placeholder="Select source wallet"
              required
            />

            <Dropdown
              label="To Wallet"
              name="destination_wallet_id"
              value={form.destination_wallet_id}
              onChange={handleChange}
              options={destinationWalletOptions}
              error={validationErrors.destination_wallet_id}
              disabled={loading || walletOptions.length < 2}
              placeholder="Select destination wallet"
              required
            />
          </>
        )}

        {/* Category Selection for Income/Expense */}
        {isIncomeOrExpense && (
          <>
            <Dropdown
              label="Category"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              options={categoryOptions}
              error={validationErrors.category_id}
              disabled={loading || categoryOptions.length === 0}
              placeholder={
                categoryOptions.length === 0
                  ? `No ${form.type.toLowerCase()} categories available`
                  : "Select category (optional)"
              }
            />

            {/* Subcategory Selection - only show if category is selected and has subcategories */}
            {form.category_id && subcategoryOptions.length > 0 && (
              <Dropdown
                label="Subcategory"
                name="subcategory_id"
                value={form.subcategory_id}
                onChange={handleChange}
                options={subcategoryOptions}
                error={validationErrors.subcategory_id}
                disabled={loading}
                placeholder="Select subcategory (optional)"
              />
            )}
          </>
        )}

        <Input
          label="Note"
          name="note"
          value={form.note || ""}
          onChange={handleChange}
          error={validationErrors.note}
          disabled={loading}
          placeholder="Add a note (optional)"
          multiline
        />

        {/* Validation warnings */}
        {isTransfer && walletOptions.length < 2 && (
          <p className="text-amber-600 text-sm mb-4">
            You need at least 2 wallets to create a transfer transaction.
          </p>
        )}

        {/* Category availability warning */}
        {isIncomeOrExpense && categoryOptions.length === 0 && (
          <p className="text-amber-600 text-sm mb-4">
            No {form.type.toLowerCase()} categories available. You can still
            create the transaction without a category.
          </p>
        )}
      </div>

      <ModalButtons
        onSubmit={() => validateAndSubmit(onSubmit)}
        onCancel={onCancel}
        loading={loading}
        submitDisabled={
          (isTransfer && walletOptions.length < 2) || !form.type || !form.amount
        }
      />
    </>
  );
};

export default TransactionModal;
