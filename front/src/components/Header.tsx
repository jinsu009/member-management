import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import flowerIcon from "@/assets/images/icons/flower.png";

import "./Header.css";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();

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

  const movePage = () => {
    if (isLogin) {
      navigate("/checkPw");
    } else {
      const isConfirm = window.confirm(
        "로그아웃 상태입니다. 로그인 페이지로 이동하시겠습니까?",
      );
      if (isConfirm) navigate("/login");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <header className="user-header">
      {/* Logo */}
      <button
        type="button"
        className="user-header__logo"
        onClick={() => navigate("/main")}
        aria-label="메인으로 이동"
      >
        <img
          className="user-header__flower"
          src={flowerIcon}
          alt=""
          aria-hidden="true"
        />
      </button>

      {/* User */}
      <button
        type="button"
        className="user-header__user"
        onClick={movePage}
        aria-label="회원 정보 관리"
      >
        <User size={28} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </header>
  );
}

export default Header;
