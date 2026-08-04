import { CalendarDays } from "lucide-react";

import flowerIcon from "@/assets/images/icons/flower.png";
import "@/assets/css/components/Header.css";

function Header() {
  return (
    <header className="user-header">
      <div className="user-header__title-area">
        <img
          className="user-header__flower"
          src={flowerIcon}
          alt=""
          aria-hidden="true"
        />

        <h1 className="user-header__title">프로젝트 제목 (미정)</h1>
      </div>

      <div className="user-header__date">
        <CalendarDays size={25} aria-hidden="true" />

        <time dateTime="2026-08-04T20:47">2026년 8월 4일 20:47</time>
      </div>
    </header>
  );
}

export default Header;
