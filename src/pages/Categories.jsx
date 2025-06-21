// pages/Categories.jsx
import React, { useEffect, useState } from "react";
import useCategoryStore from "../stores/categoryStore";
import useAuthStore from "../stores/authStore";
import Title from "@/components/ui/texts/Title";
import CategoryList from "../components/menu/categories/CategoryList";

const Categories = () => {
  const { currentUser } = useAuthStore();
  const { categories, setCurrentUser, loading, error } = useCategoryStore();
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expenseExpanded, setExpenseExpanded] = useState(true);
  const [incomeExpanded, setIncomeExpanded] = useState(true);

  // TRIGGER FETCH BASED ON USER
  useEffect(() => {
    setCurrentUser(currentUser?.uid);
  }, [currentUser?.uid, setCurrentUser]);

  console.log("categories")
  console.log(categories)

  const expenseCategories = categories.filter(cat => cat.type === 1);
  const incomeCategories = categories.filter(cat => cat.type === 2);

  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center mb-6">
          <Title>Categories</Title>
          <button
            // onClick={handleCreateWalletClick}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
          >
            + New Category
          </button>
        </div>

        <p 
          onClick={() => setExpenseExpanded(!expenseExpanded)} 
          className="cursor-pointer select-none"
        >
          {expenseExpanded ? '▼' : '▶'} Expense
        </p>
        {expenseExpanded && (
          <CategoryList
            categories={expenseCategories}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
            loading={loading}
            error={error}
          />
        )}

        <p 
          onClick={() => setIncomeExpanded(!incomeExpanded)} 
          className="cursor-pointer select-none"
        >
          {incomeExpanded ? '▼' : '▶'} Income
        </p>
        {incomeExpanded && (
          <CategoryList
            categories={incomeCategories}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default Categories;