// components/menu/wallets/WalletItem.jsx
const WalletItem = ({
  wallet,
  activeWallet,
  setActiveWallet,
  handleEditWalletClick,
  handleDeleteWalletClick,
}) => {
  return (
    <li
      onClick={() => setActiveWallet(wallet.id === activeWallet ? null : wallet.id)}
      className={`p-2 flex justify-between items-center rounded-lg border ${wallet.id == activeWallet ? "border-red-500" : "border-gray-300"}`}
    >
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
