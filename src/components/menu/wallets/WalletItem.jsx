// components/menu/wallets/WalletItem.jsx
const WalletItem = ({
  wallet,
  handleEditWalletClick,
  handleDeleteWalletClick,
}) => {
  return (
    <li className="py-2 flex justify-between items-center border-b border-gray-200">
      <div>
        <p>
          <strong>Name:</strong> {wallet.name || "Unnamed"}
        </p>
        <p>
          <strong>Balance:</strong> {wallet.amount || 0}
        </p>
        <p>
          <strong>Currency:</strong> {wallet.currency_code}
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => handleEditWalletClick(wallet)}
          className="px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteWalletClick(wallet.id)}
          className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default WalletItem;
