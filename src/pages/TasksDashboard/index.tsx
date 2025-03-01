import { useLoaderData, useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { fetchTasksThunk } from "../../redux/tasks/tasksSlice";
import { Task } from "../../types";
import { unwrapResult } from "@reduxjs/toolkit";
import TasksGraph from "../../components/TasksGraph";
import TasksDueDates from "../../components/TasksDueDates";
import Sidebar from "../../components/Sidebar";
import viewAllTasksLoader from "../../Loaders/viewAllTasksLoader";

const TasksDashboard = () => {
  const navigate = useNavigate();
  // const [tasksList, setTasksList] = useState<Task[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [showGraph, setShowGraph] = useState(false);
  const [showDueDates, setShowDueDates] = useState(false);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await dispatch(fetchTasksThunk());
  //       const tasks = unwrapResult(response);
  //       console.log(tasks, "tasks check");
  //       if (tasks) {
  //         setTasksList(tasks);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching tasks", error);
  //     }
  //   };

  //   fetchTasks();
  // }, [dispatch]);

  const tasksList = useLoaderData() as Task[];

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

  console.log(selectedStatus, selectedCategory, selectedCategory, "selected");

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
      <Sidebar
        openDueDates={() => {
          setShowDueDates(true);
        }}
        openGraph={() => {
          setShowGraph(true);
        }}
      />
      {showGraph && (
        <div>
          <TasksGraph
            onClose={() => {
              setShowGraph(false);
            }}
          />
        </div>
      )}
      {showDueDates && (
        <div>
          <TasksDueDates
            onClose={() => {
              setShowDueDates(false);
            }}
          />
        </div>
      )}
      <h2>Tasks Dashboard</h2>
      <div className="categories-cards">
        {selectedCategory === "" &&
          Object.entries(countCategories).map(([countText, count]) => (
            <div
              className={`filter-card ${countText}`}
              key={countText}
              onClick={() => count > 0 && handleFilterClick(countText)}
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
              className={`filter-card`}
              key={countText}
              onClick={() => count > 0 && handleFilterClick(countText)}
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
              className={`filter-card ${countText}`}
              key={countText}
              onClick={() => count > 0 && handleFilterClick(countText)}
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
        onClick={() => {
          if (selectedCategory !== "" && selectedStatus !== "") {
            setSelectedStatus("");
          } else if (selectedCategory !== "" && selectedStatus === "") {
            setSelectedCategory("");
          }
        }}
        className="back-button"
      >
        Back
      </button>
    </div>
  );
};

export default TasksDashboard;
