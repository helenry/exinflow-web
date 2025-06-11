// components/texts/Title.jsx
export default function Title({ children, className = "" }) {
  return (
    <h1 className={`font-andersongrotesk text-2xl font-bold ${className}`}>
      {children}
    </h1>
  );
}
