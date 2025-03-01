import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { setLoggedIn } from "../../redux/tasks/tasksSlice";
import { useCallback } from "react";
import loginIcon from "../../assets/loginIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.tasks.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("token");
      dispatch(setLoggedIn(false));
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [dispatch, navigate]);

  return (
    <div className="header">
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        haachidoro
      </h1>
      {/* <NavLink to="">Tasks</NavLink> */}
      <div className="nav-links">
        <div className="auth-container">
          {isLoggedIn ? (
            <img
              className="auth-icon"
              src={logoutIcon}
              alt="Logout"
              onClick={handleLogout} // No need for an extra function
            />
          ) : (
            <NavLink className="auth-link" to="/login">
              <img className="auth-icon" src={loginIcon} alt="Login" />
            </NavLink>
          )}
        </div>

        {/* <NavLink className="about" to="aboutus">
          About
        </NavLink> */}
      </div>
    </div>
  );
};

export default Header;
