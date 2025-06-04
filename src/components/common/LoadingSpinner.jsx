// components/common/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}
