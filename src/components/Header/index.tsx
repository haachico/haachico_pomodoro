import { NavLink } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <h1>haachicoductive</h1>
      {/* <NavLink to="">Tasks</NavLink> */}
      <NavLink to="aboutus">About</NavLink>
    </div>
  );
};

export default Header;
