import { useState } from "react";

function CheckPw() {
	
  const [loginInfo, setLoginInfo] = useState({
    pw: ""
  });
	
	const ajaxCheckPw = async () => {
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
      alert("잘못된 비밀번호");
    }
  } catch (error) {
    console.error("login error", error);
  }
};
	
  return (
	<div>
	<label>비밀번호 확인</label>
	<input 
		id="userPw"
		name="userPw"
		type="password"
		placeholder="비밀번호를 입력하세요"		
		onChange={(e) => {
		  setLoginInfo({ ...loginInfo, pw: e.target.value });
		}}
	>
		<button type="button" onClick={ajaxCheckPw}>
			확인
		</button>
	<div>
  );
}

export default CheckPw;
