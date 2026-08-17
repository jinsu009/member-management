import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

import { useEffect, useState } from "react";
import { Users, ShieldUser } from "lucide-react";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminLayout() {
  const adminMenus = [
    {
      label: "회원 관리",
      path: "/admin/userList",
      icon: Users,
    },
    {
      label: "관리자 관리",
      path: "/admin/adminList",
      icon: ShieldUser,
    },
  ];

  const [isLogin, setIsLogin] = useState(false);

  async function checkLogin() {
    const resp = await fetch("http://localhost:8080/admin/login/status", {
      method: "GET",
      credentials: "include",
    });

    const result = await resp.json();

    setIsLogin(result.isLogin);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="admin-layout">
      <div className="admin-layout__container">
        <AdminHeader isLogin={isLogin} />

        <div className="admin-layout__body">
          <AdminSidebar menus={adminMenus} />

          <main className="admin-layout__content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
