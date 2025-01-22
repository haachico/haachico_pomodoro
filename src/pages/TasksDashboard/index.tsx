import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import tasks from "../../db/tasksData";
import DashboardCard from "../../components/DashboardCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const TasksDashboard = () => {
  const navigate = useNavigate();
  const tasksList = useSelector((state: RootState) => state.tasks.tasks);

  const countCards = {
    pending: tasks.filter((task) => task.status === "pending").length,
    inProgress: tasks.filter((task) => task.status === "inProgress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
    low: tasks.filter((task) => task.priority === "low").length,
    medium: tasks.filter((task) => task.priority === "medium").length,
    high: tasks.filter((task) => task.priority === "high").length,
  };

  return (
    <div className="dashboard">
      <div className="count-cards">
        {Object.entries(countCards).map(([key, value]) => (
          <div
            onClick={() => {
              navigate("/tasks", {
                state: ["pending", "inProgress", "completed"].includes(key)
                  ? { status: key }
                  : { priority: key },
              });
            }}
            className={`${key}`}
          >
            <h4>{value}</h4>
            <p>
              {key === "inProgress"
                ? "In Progress"
                : `${key.slice(0, 1).toUpperCase()}${key
                    .slice(1)
                    .toLowerCase()}`}
            </p>
          </div>
        ))}
      </div>
      <div className="dashboards-cards-main">
        <div className="first-column">
          <div className="viewall-div">
            <h3>Tasks</h3>
            <NavLink to="/tasks">View All</NavLink>
          </div>
          <div className="dashbord-cards-div">
            {tasksList.slice(0, 8).map((task) => (
              <DashboardCard
                title={task.title}
                status={task.status}
                priority={task.priority}
                id={task.id}
              />
            ))}
          </div>
        </div>
        <div className="second-column">
          <button
            onClick={() => {
              navigate("/createTask");
            }}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksDashboard;
