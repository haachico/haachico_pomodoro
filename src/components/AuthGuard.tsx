import { Navigate, Outlet, useLocation } from "react-router-dom";

type AuthGuardProps = {
  isLoggedIn: boolean;
};

function AuthGuard({ isLoggedIn }: AuthGuardProps) {
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  console.log(location, "location in auth");

  return true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location?.pathname }} />
  );
}

export default AuthGuard;
