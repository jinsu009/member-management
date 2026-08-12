import { useEffect, useState } from "react";

import "./MyPage.css";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  name: string;
  email: string;
}

function MyPage() {
  const navigation = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
  });

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const validationEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return false;
    }
    return true;
  };

  // 사용자 정보 조회
  const getUserInfo = async () => {
    try {
      const resp = await fetch("http://localhost:8080/user/getUserInfo", {
        method: "GET",
        credentials: "include",
      });

      const result = await resp.json();
      if (result.seq != null) {
        setUserInfo({
          name: result.name,
          email: result.email,
        });
      }
    } catch (error) {
      console.error("get user info error", error);
    }
  };

  // 이메일 수정 Modal 열기
  const openEmailModal = () => {
    setNewEmail(userInfo.email);
    setIsEmailModalOpen(true);
  };

  // 이메일 수정 Modal 닫기
  const closeEmailModal = () => {
    setNewEmail("");
    setIsEmailModalOpen(false);
  };

  // 이메일 저장
  const updateEmail = async () => {
    if (!newEmail.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (validationEmail(newEmail)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const param = {
      email: newEmail.trim(),
    };

    try {
      const resp = await fetch(
        "http://localhost:8080/user/ajax/updateUserInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(param),
        },
      );

      const result = await resp.json();

      if (result.resultCd === "S") {
        setUserInfo((prev) => ({
          ...prev,
          email: newEmail.trim(),
        }));

        closeEmailModal();

        alert("이메일이 수정되었습니다.");
      } else {
        alert("이메일 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("update email error", error);
    }
  };

  // 로그아웃
  const logout = async () => {
    const isConfirm = window.confirm("로그아웃 하시겠습니까?");

    if (!isConfirm) {
      return;
    }

    try {
      const resp = await fetch("http://localhost:8080/user/ajax/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await resp.json();

      if (!result.isLogin) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("logout error", error);
    }
  };

  // 회원 탈퇴
  const resignUser = async () => {
    const isConfirm = window.confirm(
      "회원 탈퇴 후 복구할 수 없습니다.\n정말 탈퇴하시겠습니까?",
    );

    if (!isConfirm) {
      return;
    }

    try {
      const resp = await fetch("http://localhost:8080/user/ajax/userResign", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const res = await resp.json();

      if (res.resultCd === "S") {
        alert("탈퇴성공. 메인페이지로 이동합니다.");
        navigation("/main");
      } else {
        alert("회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error("logout error", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <main className="mypage">
      <section className="mypage__container">
        <div className="mypage__header">
          <h1>내 정보</h1>
          <p>회원 정보를 확인하고 관리할 수 있습니다.</p>
        </div>

        <div className="mypage__content">
          {/* 이름 */}
          <div className="mypage__field">
            <label className="mypage__label" htmlFor="userName">
              이름
            </label>

            <div className="mypage__input-row">
              <input
                id="userName"
                type="text"
                className="mypage__input"
                value={userInfo.name}
                readOnly
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className="mypage__field">
            <label className="mypage__label" htmlFor="userEmail">
              이메일
            </label>

            <div className="mypage__input-row">
              <input
                id="userEmail"
                type="email"
                className="mypage__input"
                value={userInfo.email}
                readOnly
              />

              <button
                type="button"
                className="mypage__edit-button"
                onClick={openEmailModal}
              >
                수정
              </button>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mypage__footer">
          <button
            type="button"
            className="mypage__logout-button"
            onClick={logout}
          >
            로그아웃
          </button>

          <button
            type="button"
            className="mypage__resign-button"
            onClick={resignUser}
          >
            회원 탈퇴
          </button>
        </div>
      </section>

      {/* 이메일 수정 Modal */}
      {isEmailModalOpen && (
        <div className="mypage-modal">
          <div className="mypage-modal__background" onClick={closeEmailModal} />

          <div
            className="mypage-modal__content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="email-modal-title"
          >
            <div className="mypage-modal__header">
              <h2 id="email-modal-title">이메일 수정</h2>

              <p>새로 사용할 이메일을 입력해주세요.</p>
            </div>

            <div className="mypage-modal__body">
              <label htmlFor="newEmail">새로운 이메일</label>

              <input
                id="newEmail"
                type="email"
                value={newEmail}
                placeholder="이메일을 입력해주세요."
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateEmail();
                  }
                }}
                autoFocus
              />
            </div>

            <div className="mypage-modal__footer">
              <button
                type="button"
                className="mypage-modal__cancel"
                onClick={closeEmailModal}
              >
                취소
              </button>

              <button
                type="button"
                className="mypage-modal__save"
                onClick={updateEmail}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyPage;
