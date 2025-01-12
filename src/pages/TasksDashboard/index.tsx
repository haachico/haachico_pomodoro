import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import tasks from "../../db/tasksData";
import DashboardCard from "../../components/DashboardCard";
const TasksDashboard = () => {
  const navigate = useNavigate();

  const completedTasksCount: number = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const inProgressTasksCount: number = tasks.filter(
    (task) => task.status === "inProgress"
  ).length;

  const pendingTasksCount: number = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const countCards: {
    completed: number;
    inProgress: number;
    pending: number;
  } = {
    completed: completedTasksCount,
    inProgress: inProgressTasksCount,
    pending: pendingTasksCount,
  };

  return (
    <div className="dashboard">
      <div className="count-cards">
        {Object.entries(countCards).map(([key, value]) => (
          <div
            onClick={() => {
              navigate("/tasks");
            }}
            className={`${key}`}
          >
            <h4>{value}</h4>
            <p>{key}</p>
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
            {tasks.slice(0, 10).map((task) => (
              <DashboardCard
                title={task.title}
                status={task.status}
                priority={task.priority}
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
