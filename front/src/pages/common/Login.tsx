import { useState, type ChangeEvent, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole, User, UserRoundPlus } from "lucide-react";
import userLockIcon from "@/assets/images/icons/user_lock_icon.png";
import loginBackground from "@/assets/images/login_background.png";
import "@/assets/css/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
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
      const resp = await fetch("http://localhost:8080/user/ajax/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });
      const result = await resp.json();
      if (result.resultCd === "S") navigation("/main");
      else alert("로그인실패");
    } catch (error) {
      console.error("login error");
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-form-section">
          <div className="login-form-container">
            <img
              className="login-user-icon"
              src={userLockIcon}
              alt=""
              aria-hidden="true"
            />

            <div className="login-heading">
              <h1>환영합니다!</h1>
              <p>아이디와 비밀번호를 입력해 주세요.</p>
            </div>

            <div className="login-form">
              <div className="login-field">
                <label htmlFor="userId">아이디</label>

                <div className="login-input-box">
                  <User
                    className="login-input-icon"
                    size={20}
                    aria-hidden="true"
                  />

                  <input
                    id="userId"
                    name="userId"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    autoComplete="username"
                    value={loginInfo.userId}
                    onChange={(e) => {
                      setLoginInfo({ ...loginInfo, userId: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="userPw">비밀번호</label>

                <div className="login-input-box">
                  <LockKeyhole
                    className="login-input-icon"
                    size={20}
                    aria-hidden="true"
                  />

                  <input
                    id="userPw"
                    name="userPw"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    autoComplete="current-password"
                    value={loginInfo.userPw}
                    onChange={(e) => {
                      setLoginInfo({ ...loginInfo, userPw: e.target.value });
                    }}
                  />

                  <button className="password-toggle-button" type="button">
                    {/* {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )} */}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="save-id-label">
                  <input name="saveId" type="checkbox" />

                  <span>아이디 저장</span>
                </label>

                <button className="find-password-button" type="button">
                  비밀번호 찾기
                </button>
              </div>

              <button
                className="login-submit-button"
                onClick={ajaxLogin}
                onKeyDown={handleKeyDown}
              >
                로그인
              </button>
            </div>

            <div className="login-divider">
              <span>또는</span>
            </div>

            <button className="join-button" type="button">
              <UserRoundPlus size={19} aria-hidden="true" />
              <span>회원가입</span>
            </button>
          </div>
        </div>

        <div className="login-info-section">
          <img
            className="login-background-image"
            src={loginBackground}
            alt=""
            aria-hidden="true"
          />

          <div className="login-info-content">
            <div className="login-shield">
              <User size={42} strokeWidth={1.8} aria-hidden="true" />
              <span>✓</span>
            </div>

            <h2>
              안전하고 간편한
              <br />
              회원 관리 시스템
            </h2>

            <p>
              회원님의 정보를 안전하게 보호하고
              <br />
              편리한 서비스를 제공합니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
