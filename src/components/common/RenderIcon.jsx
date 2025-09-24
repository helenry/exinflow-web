// components/common/RenderIcon.jsx
import { ICON_OPTIONS } from "../../constants";

const RenderIcon = ({ iconName, size = 16, color = "#000000" }) => {
  const IconComponent = ICON_OPTIONS[iconName];
  return <IconComponent size={size} color={color} />;
};

export default RenderIcon;
