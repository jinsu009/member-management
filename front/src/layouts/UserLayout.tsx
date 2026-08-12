import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ListTodo, UserRound } from "lucide-react";
import "./UserLayout.css";

import { useEffect, useState } from "react";

function UserLayout() {
  const userMenus = [
    {
      label: "투두리스트",
      path: "/todo",
      icon: ListTodo,
    },
    // {
    //   label: "내 정보",
    //   path: "/checkPw",
    //   icon: UserRound,
    // },
  ];

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
          <Sidebar menus={userMenus} />
          <main className="user-layout__content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
