import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/common/Login";
import UserLayout from "./layouts/UserLayout";
import UserMain from "./pages/user/UserMain";
import Main from "./pages/common/Main";
import MyPage from "./pages/user/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} /> */}

        <Route path="/" element={<UserLayout />}>
          <Route path="main" element={<Main />} />
          {/* <Route path="todo"></Route> */}
          <Route path="myPage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
