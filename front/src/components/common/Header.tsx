import { CalendarDays } from "lucide-react";

import flowerIcon from "@/assets/images/icons/flower.png";
import "@/assets/css/components/Header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());

  const formattedTime = `
  ${currentTime.getFullYear()}년 ${currentTime.getMonth() + 1}월 ${currentTime.getDate()}일 
  ${String(currentTime.getHours()).padStart(2, "0")}:${String(currentTime.getMinutes()).padStart(2, "0")}:${String(currentTime.getSeconds()).padStart(2, "0")}`;

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
          <button>로그아웃</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
