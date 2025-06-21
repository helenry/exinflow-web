// components/menu/categories/CategoryItem.jsx
import { useState } from "react";
import { ICON_OPTIONS } from "../../../constants";
import { ICONS } from "../../../constants/icons";

const CategoryItem = ({
  category,
  subcategory,
  expandedCategories,
  setExpandedCategories,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const item = subcategory || category;
  
  let Icon = ICON_OPTIONS[item.icon];
  
  return (
    <div
      className={`flex items-center rounded-full w-fit relative group ${!subcategory && 'cursor-pointer'} ${
        subcategory 
          ? 'px-2 py-0.5 text-xs' // Smaller when showing subcategory
          : 'px-4 py-1 text-sm'   // Normal size when showing category only
      }`}
      style={{ backgroundColor: `#${category.color}` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Icon && (
        <Icon 
          className={`text-white ${
            subcategory ? 'mr-1 w-3 h-3' : 'mr-2 w-4 h-4'
          }`} 
        />
      )}
      <p className="text-white">{item.name}</p>
      
      {/* Edit/Delete Icons with Animation */}
      {
        isHovered && <div className={`ml-2 flex gap-1 transition-all duration-200`}>
          <button
            className="text-white hover:text-yellow-300 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // Handle edit
            }}
          >
            <ICONS.EDIT />
          </button>
          <button
            className="text-white hover:text-red-300 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // Handle delete
            }}
          >
            <ICONS.DELETE />
          </button>
        </div>
      }
    </div>
  );
};

export default CategoryItem;