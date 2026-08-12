import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CheckPw.css";

function CheckPw() {
  const navigation = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    pw: "",
    type: "",
  });

  const ajaxCheckPw = async () => {
    if (!loginInfo.pw.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    loginInfo.type = "checkPw";

    try {
      const resp = await fetch("http://localhost:8080/user/ajax/userCheckPw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });

      const result = await resp.json();

      if (result.resultCd === "S") {
        navigation("/myPage");
      } else {
        alert("잘못된 비밀번호입니다.");
      }
    } catch (error) {
      console.error("password check error", error);
      alert("비밀번호 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="check-pw-page">
      <section className="check-pw-card">
        <div className="check-pw-icon">
          <LockKeyhole size={34} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="check-pw-heading">
          <h1>비밀번호 확인</h1>

          <p>
            회원정보 보호를 위해
            <br />
            비밀번호를 다시 한번 입력해주세요.
          </p>
        </div>

        <div className="check-pw-form">
          <div className="check-pw-field">
            <label htmlFor="userPw">비밀번호</label>

            <input
              id="userPw"
              name="userPw"
              type="password"
              value={loginInfo.pw}
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => {
                setLoginInfo((prev) => ({
                  ...prev,
                  pw: e.target.value,
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  ajaxCheckPw();
                }
              }}
              autoFocus
            />
          </div>

          <button
            type="button"
            className="check-pw-submit"
            onClick={ajaxCheckPw}
          >
            확인
          </button>
        </div>
      </section>
    </main>
  );
}

export default CheckPw;
