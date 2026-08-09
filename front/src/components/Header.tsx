import { CalendarDays } from "lucide-react";

import flowerIcon from "@/assets/images/icons/flower.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

type HeaderProps = {
  isLogin: boolean;
};

function Header(prop: HeaderProps) {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());

  const formattedTime = `
  ${currentTime.getFullYear()}년 ${currentTime.getMonth() + 1}월 ${currentTime.getDate()}일 
  ${String(currentTime.getHours()).padStart(2, "0")}:${String(currentTime.getMinutes()).padStart(2, "0")}:${String(currentTime.getSeconds()).padStart(2, "0")}`;

  async function logout() {
    const resp = await fetch("http://localhost:8080/user/ajax/logout", {
      method: "POST",
      credentials: "include",
    });
    const result = await resp.json();
    if (!result.isLogin) window.location.reload();
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="user-header">
      <div
        className="user-header__title-area"
        onClick={() => {
          navigate("/main");
        }}
      >
        <img
          className="user-header__flower"
          src={flowerIcon}
          alt="flowerIcon"
          aria-hidden="true"
        />
        <h1 className="user-header__title">프로젝트 제목 (미정)</h1>
      </div>

      <div className="user-header__side_wrap">
        <div className="user-header__date">
          <CalendarDays size={25} aria-hidden="true" />
          <time dateTime={currentTime.toISOString()}>{formattedTime}</time>
        </div>
        <div className="user-header__btn_wrap">
          {prop.isLogin ? (
            <button onClick={logout}>로그아웃</button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
