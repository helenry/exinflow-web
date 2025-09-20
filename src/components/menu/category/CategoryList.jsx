// components/menu/category/CategoryList.jsx
import React, { useCallback } from "react";
import CategoryItem from "./CategoryItem";
import SubcategoryItem from "./subcategory/SubcategoryItem";

const CategoryList = ({
  categories,
  expandedCategories,
  setExpandedCategories,
  handleEditCategoryClick,
  handleDeleteCategoryClick,
  handleCreateSubcategoryClick,
  handleEditSubcategoryClick,
  handleDeleteSubcategoryClick,
  loading,
  error,
}) => {
  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No categories found.</p>
        <p className="text-sm">Create your first category to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <CategoryItem
            key={category.id} // Add a key if available
            category={category}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
            handleEditCategoryClick={handleEditCategoryClick}
            handleDeleteCategoryClick={handleDeleteCategoryClick}
            handleCreateSubcategoryClick={handleCreateSubcategoryClick}
            />
          {
            category.subcategories && category.subcategories.length > 0 && category.subcategories.map((subcategory) => (
              <SubcategoryItem
                key={subcategory.id} // Add a key if available
                category={category}
                subcategory={subcategory}
                handleEditSubcategoryClick={handleEditSubcategoryClick}
                handleDeleteSubcategoryClick={handleDeleteSubcategoryClick}
              />
            ))
          }
        </React.Fragment>
      ))}
    </div>
  );
};

export default CategoryList;
