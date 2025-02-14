import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";
import { ReactNode } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

function AuthGuard({ children }: AuthGuardProps) {
  const token = sessionStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

export default AuthGuard;
