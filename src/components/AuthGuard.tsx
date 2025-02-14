import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { ReactNode } from 'react';


type  AuthGuardProps = {
    children: ReactNode;
  }
  
function AuthGuard({ children}: AuthGuardProps) {
const isLoggedIn = useSelector((state: RootState) => state.tasks.isLoggedIn);


  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;