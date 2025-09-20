// pages/Categories.jsx
import { useEffect, useState } from "react";
import useCategoryStore from "../stores/category/categoryStore";
import useAuthStore from "../stores/auth/authStore";
import Title from "@/components/ui/texts/Title";
import CategoryList from "../components/menu/category/CategoryList";
import { createCategoryHandler, deleteCategoryHandler, editCategoryHandler } from "../handlers/categoryHandlers";
import useModalStore from "../stores/modal/modalStore";
import { TRANSACTION_TYPES } from "../constants";
import { createSubcategoryHandler, deleteSubcategoryHandler, editSubcategoryHandler } from "../handlers/subcategoryHandlers";

const Categories = () => {
  const { currentUser } = useAuthStore();
  const { openModal, closeModal, modal } = useModalStore();
  const { categories, deleteCategory, deleteSubcategory, setCurrentUser, loading, error } = useCategoryStore();
  const [expandedCategories, setExpandedCategories] = useState([]);

  // TRIGGER FETCH BASED ON USER
  useEffect(() => {
    setCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCurrentUser]);

  const handleCreateCategoryClick = createCategoryHandler(openModal);
  const handleEditCategoryClick = editCategoryHandler(openModal);
  const handleDeleteCategoryClick = deleteCategoryHandler(
    deleteCategory,
    closeModal,
    modal,
  );

  const handleCreateSubcategoryClick = createSubcategoryHandler(openModal);
  const handleEditSubcategoryClick = editSubcategoryHandler(openModal);
  const handleDeleteSubcategoryClick = deleteSubcategoryHandler(
    deleteSubcategory,
    closeModal,
    modal,
  );

  const expenseCategories = categories.filter(cat => cat.type === TRANSACTION_TYPES.EXPENSE);
  const incomeCategories = categories.filter(cat => cat.type === TRANSACTION_TYPES.INCOME);

  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center mb-6">
          <Title>Categories</Title>
          <button
            onClick={handleCreateCategoryClick}
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
              handleEditCategoryClick={handleEditCategoryClick}
              handleDeleteCategoryClick={handleDeleteCategoryClick}
              handleCreateSubcategoryClick={handleCreateSubcategoryClick}
              handleEditSubcategoryClick={handleEditSubcategoryClick}
              handleDeleteSubcategoryClick={handleDeleteSubcategoryClick}
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
              handleEditCategoryClick={handleEditCategoryClick}
              handleDeleteCategoryClick={handleDeleteCategoryClick}
              handleCreateSubcategoryClick={handleCreateSubcategoryClick}
              handleEditSubcategoryClick={handleEditSubcategoryClick}
              handleDeleteSubcategoryClick={handleDeleteSubcategoryClick}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;