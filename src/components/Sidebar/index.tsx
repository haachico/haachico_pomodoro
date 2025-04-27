import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

type SidebarProps = {
  openDueDates: () => void;
  openGraph: () => void;
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  openDueDates,
  openGraph,
  isOpen,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${isOpen ? "visible" : ""}`}>
      <button
        className="sidebar-btn"
        onClick={() => {
          navigate("/tasks");
        }}
      >
        View All Tasks
      </button>
      <button
        className="sidebar-btn"
        onClick={() => {
          navigate("/createTask");
        }}
      >
        Create Task
      </button>
      <button className="sidebar-btn" onClick={openGraph}>
        View Graph
      </button>
      <button className="sidebar-btn" onClick={openDueDates}>
        View Due Dates
      </button>
    </div>
  );
};

export default Sidebar;
