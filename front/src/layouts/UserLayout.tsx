import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import Main from "../pages/common/Main";
import "@/assets/css/layouts/UserLayout.css";

function UserLayout() {
  return (
    <div className="user-layout">
      <div className="user-layout__container">
        <Header />
        <div className="user-layout__body">
          <Sidebar />

          <main className="user-layout__content">
            <Main />
          </main>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
