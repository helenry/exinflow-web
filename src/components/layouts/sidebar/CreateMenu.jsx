// components/layouts/sidebar/CreateMenu.jsx
const CreateMenu = ({ items, onItemClick }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[140px]">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onItemClick(item)}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm capitalize"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CreateMenu;