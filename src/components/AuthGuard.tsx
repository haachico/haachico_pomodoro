import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

function AuthGuard() {
  const isLoggedIn = useSelector((state: RootState) => state.tasks.isLoggedIn);

  const token = sessionStorage.getItem("token");
  // const location = useLocation();
  // const from = location.pathname;
  // sessionStorage.setItem("from", from);

  const pathname = new URL(window.location.href).pathname;

  // const storedLoginStatus = sessionStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn && !token) {
    return <Navigate to={`/login?redirectTo=${pathname}`} />;
  }

  return <Outlet />;
}

export default AuthGuard;
