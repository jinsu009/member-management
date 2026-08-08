import { ListTodo, UserRound, type LucideIcon } from "lucide-react";

import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

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

  return (
    <aside className="user-sidebar">
      <nav className="user-sidebar__navigation" aria-label="사용자 메뉴">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <button
              key={menu.path}
              className="user-sidebar__menu"
              type="button"
              onClick={() => navigate(menu.path)}
            >
              <Icon size={24} aria-hidden="true" />
              <span>{menu.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
