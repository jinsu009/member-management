import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import "@/assets/css/layouts/UserLayout.css";

import { useEffect, useState } from "react";

function UserLayout() {
  const [isLogin, setIsLogin] = useState(false);

  async function checkLogin() {
    const resp = await fetch("http://localhost:8080/user/login/status", {
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
          <Sidebar />
          <main className="user-layout__content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
