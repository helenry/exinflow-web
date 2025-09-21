// pages/Categories.jsx
import { useEffect, useState } from "react";

import Title from "@/components/ui/texts/Title";
import CategoryList from "../components/menu/category/CategoryList";

import useCategoryStore from "../stores/category/categoryStore";
import useAuthStore from "../stores/auth/authStore";

import { useModifyHandler } from "../hooks/useModifyHandler";

import { TRANSACTION_TYPES } from "../constants";

const Categories = () => {
  const { currentUser } = useAuthStore();
  const {
    categories,
    deleteCategory,
    deleteSubcategory,
    setCurrentUser,
    loading,
    error,
  } = useCategoryStore();

  const {
    handleCreate: handleCreateCategory,
    handleEdit: handleEditCategory,
    handleDelete: handleDeleteCategory,
  } = useModifyHandler("category", deleteCategory);

  const {
    handleCreate: handleCreateSubcategory,
    handleEdit: handleEditSubcategory,
    handleDelete: handleDeleteSubcategory,
  } = useModifyHandler("subcategory", deleteSubcategory);

  const [expandedCategories, setExpandedCategories] = useState([]);

  // TRIGGER FETCH BASED ON USER
  useEffect(() => {
    setCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCurrentUser]);

  const expenseCategories = categories.filter(
    (cat) => cat.type === TRANSACTION_TYPES.EXPENSE,
  );
  const incomeCategories = categories.filter(
    (cat) => cat.type === TRANSACTION_TYPES.INCOME,
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title>Categories</Title>
        <button
          onClick={handleCreateCategory}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          + New Category
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Expense column */}
        <div>
          <p className="cursor-pointer select-none mb-2">Expense</p>
          <CategoryList
            categories={expenseCategories}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
            handleEditCategoryClick={handleEditCategory}
            handleDeleteCategoryClick={handleDeleteCategory}
            handleCreateSubcategoryClick={handleCreateSubcategory}
            handleEditSubcategoryClick={handleEditSubcategory}
            handleDeleteSubcategoryClick={handleDeleteSubcategory}
            loading={loading}
            error={error}
          />
        </div>

        {/* Income column */}
        <div>
          <p className="cursor-pointer select-none mb-2">Income</p>
          <CategoryList
            categories={incomeCategories}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
            handleEditCategoryClick={handleEditCategory}
            handleDeleteCategoryClick={handleDeleteCategory}
            handleCreateSubcategoryClick={handleCreateSubcategory}
            handleEditSubcategoryClick={handleEditSubcategory}
            handleDeleteSubcategoryClick={handleDeleteSubcategory}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
