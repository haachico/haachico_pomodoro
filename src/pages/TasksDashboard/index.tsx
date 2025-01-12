import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import tasks from "../../db/tasksData";
import DashboardCard from "../../components/DashboardCard";
const TasksDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
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
  );
};

export default TasksDashboard;
