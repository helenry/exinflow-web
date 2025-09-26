// components/menu/category/CategoryItem.jsx
import { useState } from "react";
import { ICON_OPTIONS } from "../../../constants";
import { ICONS } from "../../../constants/icons";

const CategoryItem = ({
  category,
  expandedCategories,
  setExpandedCategories,
  handleEditCategoryClick,
  handleDeleteCategoryClick,
  handleCreateSubcategoryClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  let Icon = ICON_OPTIONS[category.icon];

  return (
    <div className="relative">
      {/* Tooltip with action buttons */}
      {isHovered && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Invisible bridge area to prevent tooltip from disappearing */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full h-2 bg-transparent"></div>

          <div className="bg-gray-800 rounded-full px-3 py-2 shadow-lg border border-gray-600">
            <div className="flex items-center gap-3">
              <button
                className="text-white text-base hover:text-green-400 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-700"
                onClick={() => handleCreateSubcategoryClick(category.id)}
                title="Add subcategory"
              >
                <ICONS.ADD />
              </button>
              <button
                className="text-white text-base hover:text-blue-400 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-700"
                onClick={() => handleEditCategoryClick(category)}
                title="Edit category"
              >
                <ICONS.EDIT />
              </button>
              <button
                className="text-white text-base hover:text-red-400 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-700"
                onClick={() => handleDeleteCategoryClick(category.id)}
                title="Delete category"
              >
                <ICONS.DELETE />
              </button>
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      )}

      {/* Main pill */}
      <div
        className="flex items-center rounded-full w-fit relative px-5 py-2 text-base cursor-pointer"
        style={{ backgroundColor: `#${category.color}` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Icon && <Icon className="text-white mr-2 text-base" />}
        <p className="text-white">{category.name}</p>

        {/* Right arrow (always visible when subcategories exist) */}
        {category.subcategories && category.subcategories.length > 0 && (
          <button
            className="text-white text-lg hover:text-yellow-300 transition-colors cursor-pointer ml-2"
            onClick={(e) => {
              e.stopPropagation();
              // Handle expand logic here
              setExpandedCategories((prev) => ({
                ...prev,
                [category.id]: !prev[category.id],
              }));
            }}
          >
            <ICONS.ARROW_LEFT />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
