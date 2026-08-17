import { type LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Sidebar.css";

type SidebarMenu = {
  label: string;
  path: string;
  icon: LucideIcon;
};

type SidebarProps = {
  menus: SidebarMenu[];
};

function Sidebar({ menus }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="user-sidebar">
      <nav className="user-sidebar__navigation" aria-label="사용자 메뉴">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const isActive = location.pathname === menu.path;

          return (
            <button
              key={menu.path}
              className={`user-sidebar__menu ${
                isActive ? "user-sidebar__menu--active" : ""
              }`}
              type="button"
              onClick={() => navigate(menu.path)}
            >
              <Icon size={21} strokeWidth={1.8} aria-hidden="true" />

              <span>{menu.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
