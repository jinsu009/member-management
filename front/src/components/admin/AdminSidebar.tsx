import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

import "./AdminSidebar.css";

interface AdminMenu {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  menus: AdminMenu[];
}

function AdminSidebar({ menus }: AdminSidebarProps) {
  return (
    <aside className="admin-sidebar">
      <nav className="admin-sidebar__nav">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `admin-sidebar__menu ${
                  isActive ? "admin-sidebar__menu--active" : ""
                }`
              }
            >
              <Icon className="admin-sidebar__icon" size={20} />

              <span>{menu.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
