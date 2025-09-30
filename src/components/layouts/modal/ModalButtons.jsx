// components/layouts/modal/ModalButtons.jsx
const ModalButtons = ({ onSubmit, onCancel, loading, submitText = "Save" }) => {
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
        onClick={() => onSubmit()}
        disabled={loading}
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : submitText}
      </button>
    </div>
  );
};

export default ModalButtons;
