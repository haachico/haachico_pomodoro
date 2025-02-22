import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { setLoggedIn } from "../../redux/tasks/tasksSlice";
import { useCallback } from "react";

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
        haachicoductive
      </h1>
      {/* <NavLink to="">Tasks</NavLink> */}
      <div className="nav-links">
        <div>
          {isLoggedIn ? (
            <h3
              className="logout"
              onClick={() => {
                handleLogout();
              }}
            >
              Log out
            </h3>
          ) : (
            <NavLink className="login" to="/login">
              Log in
            </NavLink>
          )}
        </div>

        <NavLink className="about" to="aboutus">
          About
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
