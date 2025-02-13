import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
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
        <NavLink className="login" to="/login">
          Log in
        </NavLink>
        <NavLink className="about" to="aboutus">
          About
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
