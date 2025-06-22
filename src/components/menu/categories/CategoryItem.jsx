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
      className={`flex items-center rounded-full w-fit relative group ${
        subcategory 
          ? 'px-3 py-1.5 text-sm' // Smaller when showing subcategory
          : 'px-5 py-2 text-base'   // Normal size when showing category only
      }`}
      style={{ backgroundColor: `#${category.color}` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Icon && (
        <Icon 
          className={`text-white ${
            subcategory ? 'mr-1 text-sm' : 'mr-2 text-base'
          }`} 
        />
      )}

      <p className="text-white">{item.name}</p>

      <div className={`${subcategory ? 'gap-2' : 'gap-3'} ${(!subcategory && item.subcategories.length > 0) || isHovered ? 'ml-2' : ''} flex`}>
        {
          !subcategory && item.subcategories.length > 0 && <button
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
          isHovered && <div className={`${subcategory ? 'gap-2' : 'gap-3'} flex transition-all duration-200`}>
            {
              !subcategory && <button
                className="text-white text-base hover:text-yellow-300 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle add
                }}
              >
                <ICONS.ADD />
              </button>
            }
            <button
              className={`${subcategory ? 'text-sm' : 'text-base'} text-white hover:text-yellow-300 transition-colors cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit
              }}
            >
              <ICONS.EDIT />
            </button>
            <button
              className={`${subcategory ? 'text-sm' : 'text-base'} text-white hover:text-red-300 transition-colors cursor-pointer`}
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
    </div>
  );
};

export default CategoryItem;