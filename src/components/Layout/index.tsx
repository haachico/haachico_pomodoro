import { Outlet } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const Layout = () => {
  return (
    <div className="main-body ">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
