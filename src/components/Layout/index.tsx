import { Outlet } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const Layout = () => {
  return (
    <div className="main-body">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
