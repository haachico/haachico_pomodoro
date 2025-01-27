import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import DashboardCard from "../../components/DashboardCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";

const TasksDashboard = () => {
  const navigate = useNavigate();
  const tasksList = useSelector((state: RootState) => state.tasks.tasks);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const countCategories: {
    [key: string]: number;
  } = {
    work: tasksList.filter((task) => task.category === "work").length,
    personal: tasksList.filter((task) => task.category === "personal").length,
    study: tasksList.filter((task) => task.category === "study").length,
  };

  const countStatus = {
    pending: tasksList.filter(
      (task) => task.category === selectedCategory && task.status === "pending"
    ).length,
    inProgress: tasksList.filter(
      (task) =>
        task.category === selectedCategory && task.status === "inProgress"
    ).length,
    completed: tasksList.filter(
      (task) =>
        task.category === selectedCategory && task.status === "completed"
    ).length,
  };

  const countPriority = {
    low: tasksList.filter(
      (task) =>
        task.category === selectedCategory &&
        task.status === selectedStatus &&
        task.priority === "low"
    ).length,
    medium: tasksList.filter(
      (task) =>
        task.category === selectedCategory &&
        task.status === selectedStatus &&
        task.priority === "medium"
    ).length,
    high: tasksList.filter(
      (task) =>
        task.category === selectedCategory &&
        task.status === selectedStatus &&
        task.priority === "high"
    ).length,
  };

  const filtersToShow = () => {
    if (selectedCategory === "") {
      return countCategories;
    } else if (selectedCategory !== "" && selectedStatus === "") {
      return countStatus;
    } else {
      return countPriority;
    }
  };

  const handleFilterClick = (filter: string) => {
    if (selectedCategory === "") {
      setSelectedCategory(filter);
    } else if (selectedCategory !== "" && selectedStatus === "") {
      setSelectedStatus(filter);
    } else {
      setSelectedPriority(filter);
      navigate("/tasks", {
        state: {
          category: selectedCategory,
          status: selectedStatus,
          priority: filter,
        },
      });
    }
  };

  return (
    <div className="dashboard">
      <h2>Tasks Dashboard</h2>
      <button
        className="view-all-btn"
        onClick={() => {
          navigate("/tasks");
        }}
      >
        View all Tasks
      </button>
      <div className="categories-cards">
        {Object.entries(countCategories).length > 0
          ? Object.entries(filtersToShow()).map(([countText, count]) => (
              <div
                className={`filter-card ${countText}`}
                key={countText}
                onClick={() => handleFilterClick(countText)}
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
            ))
          : "No tasks available. Please create a task."}
      </div>

      <button
        style={{
          visibility: selectedCategory === "" ? "hidden" : "visible",
        }}
        onClick={() => {
          if (selectedCategory !== "" && selectedStatus !== "") {
            setSelectedStatus("");
          } else if (selectedCategory !== "" && selectedStatus === "") {
            setSelectedCategory("");
          }
        }}
      >
        Back
      </button>

      <button
        className="create-btn"
        onClick={() => {
          navigate("/createTask");
        }}
      >
        Create Task
      </button>
    </div>
  );
};

export default TasksDashboard;
