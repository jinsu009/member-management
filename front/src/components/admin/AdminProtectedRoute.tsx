import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const resp = await fetch("http://localhost:8080/admin/login/status", {
          method: "GET",
          credentials: "include",
        });

        const result = await resp.json();

        setIsLogin(result.isLogin);
      } catch (error) {
        console.error("admin login check error", error);

        setIsLogin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isLogin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
