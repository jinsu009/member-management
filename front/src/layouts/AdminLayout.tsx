import { Outlet } from "react-router-dom";

import "./AdminLayout.css";

import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { Users, ShieldUser } from "lucide-react";

function AdminLayout() {
  const adminMenus = [
    {
      label: "회원 관리",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "관리자 관리",
      path: "/admin/admins",
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
    if (result.isLogin) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="user-layout">
      <div className="user-layout__container">
        <Header isLogin={isLogin} />
        <div className="user-layout__body">
          <Sidebar menus={adminMenus} />
          <main className="user-layout__content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
