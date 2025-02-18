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
      className={`dashboard-card ${
        status === "in progress" ? "inProgress" : status.toLowerCase()
      } ${priority.toLowerCase()}`}
      onClick={() => {
        navigate(`/task/${id}`);
      }}
    >
      <h4>{title}</h4>

      <label className="status-label">
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
