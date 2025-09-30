// components/menu/category/subcategory/SubcategoryItem.jsx
import { useState } from "react";
import { ICON_OPTIONS } from "../../../../constants";
import { ICONS } from "../../../../constants/icons";

const SubcategoryItem = ({
  category,
  subcategory,
  handleEditSubcategoryClick,
  handleDeleteSubcategoryClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  let Icon = ICON_OPTIONS[subcategory.icon];

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

          <div className="bg-gray-800 rounded-full px-2.5 py-1.5 shadow-lg border border-gray-600">
            <div className="flex items-center gap-2">
              <button
                className="text-white text-sm hover:text-blue-400 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-700"
                onClick={() =>
                  handleEditSubcategoryClick(category.id, subcategory)
                }
                title="Edit subcategory"
              >
                <ICONS.EDIT />
              </button>
              <button
                className="text-white text-sm hover:text-red-400 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-700"
                onClick={() =>
                  handleDeleteSubcategoryClick(category.id, subcategory.id)
                }
                title="Delete subcategory"
              >
                <ICONS.DELETE />
              </button>
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      )}

      {/* Main pill */}
      <div
        className="flex items-center rounded-full w-fit relative px-3 py-1.5 text-sm cursor-pointer"
        style={{ backgroundColor: `#${category.color}` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Icon && <Icon className="text-white mr-1 text-sm" />}
        <p className="text-white">{subcategory.name}</p>
      </div>
    </div>
  );
};

export default SubcategoryItem;
