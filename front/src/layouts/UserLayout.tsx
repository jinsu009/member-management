import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import "@/assets/css/layouts/UserLayout.css";

function UserLayout() {
  return (
    <div className="user-layout">
      <div className="user-layout__container">
        <Header />
        <div className="user-layout__body">
          <Sidebar />
          <main className="user-layout__content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
