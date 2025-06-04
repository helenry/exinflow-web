// components/layout/navbar/Menus.jsx
import { routes } from '../../../routes/allRoutes';
import MenuItem from './MenuItem';

export default function Menus() {
  const menus = routes.filter(r => r.isInSidebar);

  return (
    <nav className="flex gap-2 p-2 rounded-full bg-[#e8f8fc]/75 backdrop-blur-lg border border-white/75">
      {menus.map((item, i) => (
        <MenuItem key={item.path} to={item.path} label={item.title} />
      ))}
    </nav>
  );
}
