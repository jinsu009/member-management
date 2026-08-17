import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";

interface AdminHeaderProps {
  isLogin: boolean;
}

function AdminHeader({ isLogin }: AdminHeaderProps) {
  const navigate = useNavigate();

  const logout = async () => {
    const isConfirm = window.confirm("로그아웃 하시겠습니까?");

    if (!isConfirm) {
      return;
    }

    try {
      const resp = await fetch("http://localhost:8080/admin/ajax/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await resp.json();

      if (!result.isLogin) {
        navigate("/admin/login");
      } else {
        alert("로그아웃 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("admin logout error", error);
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header__inner">
        <div className="admin-header__logo">ADMIN</div>

        <div className="admin-header__actions">
          {isLogin ? (
            <button
              type="button"
              className="admin-header__button"
              onClick={logout}
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              className="admin-header__button"
              onClick={() => navigate("/admin/login")}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
