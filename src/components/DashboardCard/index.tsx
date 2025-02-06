import { useNavigate } from "react-router-dom";
import "./index.css";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { editTaskThunk } from "../../redux/tasks/tasksSlice";
import { Task } from "../../types";

type DashboardCardProps = {
  task: Task;
};

const DashboardCard = ({ task }: DashboardCardProps) => {
  const { id, title, status, priority } = task;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const priorityColors: {
    [key: string]: string;
  } = {
    low: "#28a745", // Green
    medium: "#ffc107", // Yellow
    high: "#dc3545", // Red
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    dispatch(
      editTaskThunk({
        ...task,
        status: newStatus,
      })
    );
  };

  return (
    <div
      className="dashboard-card"
      style={{
        border: `2px solid ${priorityColors[priority.toLowerCase()]}`,
      }}
      onClick={() => {
        navigate(`/task/${id}`);
      }}
    >
      <h4 className={`${status === "in progress" ? "inProgress" : status}`}>
        {title}
      </h4>

      <label>
        <select
          value={status}
          onChange={handleStatusChange}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
    </div>
  );
};

export default DashboardCard;
