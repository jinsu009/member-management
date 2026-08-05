import { ListTodo, UserRound } from "lucide-react";

import "@/assets/css/components/Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="user-sidebar">
      <nav className="user-sidebar__navigation" aria-label="사용자 메뉴">
        <button
          className="
            user-sidebar__menu
            user-sidebar__menu--active
          "
          type="button"
        >
          <ListTodo size={25} aria-hidden="true" />
          <span>투두리스트 목록</span>
        </button>

        <button
          className="user-sidebar__menu"
          type="button"
          onClick={() => navigate("/myPage")}
        >
          <UserRound size={24} aria-hidden="true" />
          <span>내 정보</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
