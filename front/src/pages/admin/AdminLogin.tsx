import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { Input } from "antd";

function AdminLogin() {
  const navigation = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      ajaxLogin();
    }
  };

  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    userPw: "",
  });

  async function ajaxLogin() {
    try {
      const resp = await fetch("http://localhost:8080/admin/ajax/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });
      const result = await resp.json();
      if (result.resultCd === "S") navigation("/admin/userList");
      else alert("로그인실패");
    } catch (error) {
      console.error("login error");
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h1 className="admin-login__title">ADMIN</h1>

        <div className="admin-login__input-group">
          <label htmlFor="adminId">아이디</label>
          <Input
            id="adminId"
            name="adminId"
            type="text"
            placeholder="관리자 아이디를 입력해주세요."
            value={loginInfo.userId}
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, userId: e.target.value });
            }}
          />
        </div>

        <div className="admin-login__input-group">
          <label htmlFor="adminPw">비밀번호</label>
          <input
            id="adminPw"
            name="adminPw"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={loginInfo.userPw}
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, userPw: e.target.value });
            }}
          />
        </div>

        <button
          type="button"
          className="admin-login__button"
          onClick={ajaxLogin}
          onKeyDown={handleKeyDown}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
