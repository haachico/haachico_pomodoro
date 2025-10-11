import { useLoaderData, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import TasksGraph from "../../components/TasksGraph";
import TasksDueDates from "../../components/TasksDueDates";
import Sidebar from "../../components/Sidebar";

const TasksDashboard = () => {
  const navigate = useNavigate();
  const [showGraph, setShowGraph] = useState(false);
  const [showDueDates, setShowDueDates] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const tasksList = useLoaderData() as Task[];

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

    useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const countCategories: {
    [key: string]: number;
  } = {
    work: tasksList.filter((task) => task.category === "work").length,
    personal: tasksList.filter((task) => task.category === "personal").length,
    study: tasksList.filter((task) => task.category === "study").length,
  };

  const countStatus = {
    pending: tasksList.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.toLowerCase() &&
        task.status.toLowerCase() === "pending"
    ).length,

    "in progress": tasksList.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.toLowerCase() &&
        task.status.toLowerCase() === "in progress"
    ).length,
    completed: tasksList.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.toLowerCase() &&
        task.status.toLowerCase() === "completed"
    ).length,
  };

  const countPriority = {
    low: tasksList.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.toLowerCase() &&
        task.status.toLowerCase() === selectedStatus.toLowerCase() &&
        task.priority.toLowerCase() === "low"
    ).length,
    medium: tasksList.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.toLowerCase() &&
        task.status.toLowerCase() === selectedStatus.toLowerCase() &&
        task.priority.toLowerCase() === "medium"
    ).length,
    high: tasksList.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.toLowerCase() &&
        task.status.toLowerCase() === selectedStatus.toLowerCase() &&
        task.priority.toLowerCase() === "high"
    ).length,
  };

  const handleFilterClick = (filter: string) => {
    if (selectedCategory === "") {
      setSelectedCategory(filter);
    } else if (selectedCategory !== "" && selectedStatus === "") {
      setSelectedStatus(filter);
    } else {
      navigate("/tasks", {
        state: {
          category: selectedCategory,
          status: selectedStatus,
          priority: filter,
        },
      });
    }
  };

  const handleBackClick = () => {
    if (selectedCategory !== "" && selectedStatus !== "") {
      setSelectedStatus("");
    } else if (selectedCategory !== "" && selectedStatus === "") {
      setSelectedCategory("");
    }
  };

  return (
    <div className="dashboard">
       <button 
        className="menu-button"
        onClick={() => setSidebarOpen(prev => !prev)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? '×' : '☰'}
      </button>

      <Sidebar
        openDueDates={() => setShowDueDates(true)}
        openGraph={() => setShowGraph(true)}
        isOpen={sidebarOpen}
      />

      {showGraph && (
        <div className="graph-container">
          <TasksGraph onClose={() => setShowGraph(false)} />
        </div>
      )}

      {showDueDates && (
        <div className="due-dates-container">
          <TasksDueDates onClose={() => setShowDueDates(false)} />
        </div>
      )}

      <h2 className="dashbord-title">Tasks Dashboard</h2>

      <div className="categories-cards">
        {selectedCategory === "" &&
          Object.entries(countCategories).map(([countText, count]) => (
            <div
              className={`filter-card ${countText} ${count === 0 ? "disabled" : ""}`}
              key={countText}
              onClick={() => count > 0 && handleFilterClick(countText)}
              role="button"
              tabIndex={count > 0 ? 0 : -1}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && count > 0) {
                  handleFilterClick(countText);
                }
              }}
            >
              <h4>{count}</h4>
              <p>
                {countText === "inProgress"
                  ? "In Progress"
                  : `${countText.slice(0, 1).toUpperCase()}${countText
                      .slice(1)
                      .toLowerCase()}`}
              </p>
            </div>
          ))}

        {selectedCategory !== "" &&
          selectedStatus === "" &&
          Object.entries(countStatus).map(([countText, count]) => (
            <div
              className={`filter-card ${count === 0 ? "disabled" : ""}`}
              key={countText}
              onClick={() => count > 0 && handleFilterClick(countText)}
              role="button"
              tabIndex={count > 0 ? 0 : -1}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && count > 0) {
                  handleFilterClick(countText);
                }
              }}
            >
              <h4>{count}</h4>
              <p>
                {countText === "inProgress"
                  ? "In Progress"
                  : `${countText.slice(0, 1).toUpperCase()}${countText
                      .slice(1)
                      .toLowerCase()}`}
              </p>
            </div>
          ))}

        {selectedCategory !== "" &&
          selectedStatus !== "" &&
          Object.entries(countPriority).map(([countText, count]) => (
            <div
              className={`filter-card ${countText} ${count === 0 ? "disabled" : ""}`}
              key={countText}
              onClick={() => count > 0 && handleFilterClick(countText)}
              role="button"
              tabIndex={count > 0 ? 0 : -1}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && count > 0) {
                  handleFilterClick(countText);
                }
              }}
            >
              <h4>{count}</h4>
              <p>
                {countText === "inProgress"
                  ? "In Progress"
                  : `${countText.slice(0, 1).toUpperCase()}${countText
                      .slice(1)
                      .toLowerCase()}`}
              </p>
            </div>
          ))}
      </div>

      <button
        style={{
          visibility: selectedCategory === "" ? "hidden" : "visible",
        }}
        onClick={handleBackClick}
        className="back-button"
      >
        Back
      </button>
    </div>
  );
};

export default TasksDashboard;