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
  handleCreateSubcategoryClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  let Icon = ICON_OPTIONS[category.icon];
  
  return (
    <div
      className={`flex items-center rounded-full w-fit relative group px-5 py-2 text-base`}
      style={{ backgroundColor: `#${category.color}` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Icon && (
        <Icon 
          className={`text-white mr-2 text-base`} 
        />
      )}

      <p className="text-white">{category.name}</p>

      <div className={`gap-3 ${(category.subcategories && category.subcategories.length > 0) || isHovered ? 'ml-2' : ''} flex`}>
        {
          category.subcategories && category.subcategories.length > 0 && <button
            className="text-white text-lg hover:text-yellow-300 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // Handle expand
            }}
          >
            <ICONS.ARROW_LEFT />
          </button>
        }

        {/* Add/Edit/Delete Icons with Animation */}
        {
          isHovered && <div className={`gap-3 flex transition-all duration-200`}>
            <button
              className="text-white text-base hover:text-yellow-300 transition-colors cursor-pointer"
              onClick={() => handleCreateSubcategoryClick(category.id)}
            >
              <ICONS.ADD />
            </button>

            <button
              className={`text-base text-white hover:text-yellow-300 transition-colors cursor-pointer`}
              onClick={() => handleEditCategoryClick(category)}
            >
              <ICONS.EDIT />
            </button>

            <button
              className={`text-base text-white hover:text-red-300 transition-colors cursor-pointer`}
              onClick={() => handleDeleteCategoryClick(category.id)}
            >
              <ICONS.DELETE />
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default CategoryItem;