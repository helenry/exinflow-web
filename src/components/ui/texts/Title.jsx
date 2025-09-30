import { FONTS } from "../../../constants/fonts";

// components/texts/Title.jsx
export default function Title({ children, className = "" }) {
  return (
    <h1 className={`${FONTS.ANDERSON_GROTESK} text-2xl font-bold ${className}`}>
      {children}
    </h1>
  );
}
