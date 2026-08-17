import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/user/Login";
import UserLayout from "../layouts/UserLayout";
import Main from "../pages/user/Main";
import CheckPw from "../pages/user/CheckPw";
import MyPage from "../pages/user/MyPage";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../layouts/AdminLayout";
import AdminList from "../pages/admin/AdminList";
import UserList from "../pages/admin/UserList";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";

function Router() {
  return (
    <Routes>
      {/* 기본 접근 */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 일반 사용자 로그인 */}
      <Route path="/login" element={<Login />} />

      {/* 일반 사용자 영역 */}
      <Route element={<UserLayout />}>
        <Route path="/main" element={<Main />} />
        <Route path="/checkPw" element={<CheckPw />} />
        <Route path="/myPage" element={<MyPage />} />
      </Route>

      {/* 관리자 로그인 */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 관리자 영역 */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="userList" element={<UserList />} />
          <Route path="adminList" element={<AdminList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
