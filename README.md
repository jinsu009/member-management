# 🔐 Member Management

- React와 Spring Boot를 기반으로 사용자 및 관리자 인증과 회원 관리 기능을 구현하는 개인 프로젝트 입니다.
- 프론트엔드와 백엔드를 분리하여 REST API 기반으로 통신하며, 사용자와 관리자의 인증 영역 및 권한을 분리하는 것을 목표로 개발하고 있습니다. 

---

## 📌 Project Goal

- React와 Spring Boot를 활용한 Fronten / Backend 분리 구조 구현
- Spring Security 기반 인증 환경 구성
- 사용자 / 관리자 인증 영역 분리
- BCrypt를 활용한 비밀번호 암호화 및 검증
- 관리자 회원 관리 기능 구현
- React Router를 활용한 사용자 / 관리자 페이지 구성
- 회원 관리 기능을 통함 CRUD 및 서버 페이징 구현
<!--
- JWT Access / Refresh Token 구현
- OAuth2 로그인 구현
- 관리자 / 사용자 권한(Role) 관리
- 실제 서비스 수준의 회원 관리 시스템 구축
-->

---

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- MyBatis

### Frontend
- React
- React Router
- TypeScript
- Fetch API
- Ant Design

### Database
- MySQL

### ETC
- Git / GitHub

---

## ✨ Main Features

### Authentication
- 회원가입
- 사용자, 관리자 로그인 / 로그아웃
- Session 기반 로그인 상태 관리
- BCrypt 기반 비밀번호 암호화 및 검증
- `AdminAuthInterceptor`를 이용한 관리자 API 접근 제어
- 관리자 비로그인 요청에 대해 `401 Unauthorized` 처리
<!--
- JWT 인증
- Refresh Token 관리
-->
<!--
### OAuth Login
- Google
- Naver
- Kakao
- Apple
-->
  
### User
- 회원가입
- 로그인 / 로그아웃
- 회원정보 조회
- 회원정보 수정
- 회원탈퇴

### Admin
- 관리자 로그인 / 로그아웃
- 회원 관리
- 관리자 관리
- 관리자 작업 이력
- 권한(Role) 관리
- 
---

## 🏗 Project Structure

### Frontend

```text
src
├── components
│   └── common
├── layouts
│   ├── UserLayout.tsx
│   └── AdminLayout.tsx
├── pages
│   ├── user
│   └── admin
├── routes
│   └── Router.tsx
└── assets

---

## 🚧 Progress

Completed
✅ 회원가입
✅ BCrypt 비밀번호 암호화
✅ Spring Security 설정
✅ React Router 설정
✅ 사용자 로그인 / 로그아웃
✅ 사용자 로그인 상태 확인
✅ 관리자 로그인 / 로그아웃
✅ 관리자 로그인 상태 확인
✅ 회원 목록 조회
✅ 관리자 목록 조회
✅ 회원 검색
✅ 서버 페이징
In Progress
🔄 회원 정보 관리
🔄 관리자 정보 관리
🔄 Todo CRUD
🔄 Validation 및 예외 처리
🔄 UI 개선
Planned
⏳ JWT 인증
⏳ Refresh Token
⏳ OAuth2 로그인
⏳ 권한별 접근 제어 고도화

---

## 📖 Documentation

프로젝트 설계 과정, ERD, API 명세, 트러블슈팅 및 회고는 아래 Notion에서 확인할 수 있습니다.

👉 **Notion**
https://app.notion.com/p/3ad575b8220080e6a8dce9df533e8a74?source=copy_link
