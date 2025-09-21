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
    <div
      className={`flex items-center rounded-full w-fit relative group px-3 py-1.5 text-sm`}
      style={{ backgroundColor: `#${category.color}` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Icon && <Icon className={`text-white mr-1 text-sm`} />}

      <p className="text-white">{subcategory.name}</p>

      <div className={`gap-2 ${isHovered ? "ml-2" : ""} flex`}>
        {/* Add/Edit/Delete Icons with Animation */}
        {isHovered && (
          <div className={`gap-2 flex transition-all duration-200`}>
            <button
              className={`text-sm text-white hover:text-yellow-300 transition-colors cursor-pointer`}
              onClick={() =>
                handleEditSubcategoryClick(category.id, subcategory)
              }
            >
              <ICONS.EDIT />
            </button>
            <button
              className={`text-sm text-white hover:text-red-300 transition-colors cursor-pointer`}
              onClick={() =>
                handleDeleteSubcategoryClick(category.id, subcategory.id)
              }
            >
              <ICONS.DELETE />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryItem;
