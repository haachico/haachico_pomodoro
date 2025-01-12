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
      <NavLink to="aboutus">About</NavLink>
    </div>
  );
};

export default Header;
