// components/menu/categories/CategoryModalButtons.jsx
const CategoryModalButtons = ({ validateAndSubmit, onCancel, loading }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onCancel}
        disabled={loading}
        className="flex-1 px-4 py-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
      <button
        onClick={validateAndSubmit}
        disabled={loading}
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default CategoryModalButtons;