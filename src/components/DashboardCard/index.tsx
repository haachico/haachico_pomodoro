import { useNavigate } from "react-router-dom";
import "./index.css";
// import { AppDispatch } from "../../store";
// import { useDispatch } from "react-redux";
import { Task } from "../../types";
import { useDrag } from "react-dnd";

type DashboardCardProps = {
  task: Task;
  type?: string;
};

const DashboardCard = ({ task, type }: DashboardCardProps) => {
  const { id, title, status, priority } = task;

  const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const newStatus = e.target.value;
  //   dispatch(
  //     editTaskThunk({
  //       ...task,
  //       status: newStatus,
  //     })
  //   );
  // };

  return (
    <div
      className={`dashboard-card ${
        status === "in progress" ? "inProgress" : status.toLowerCase()
      } ${priority.toLowerCase()}`}
      onClick={() => {
        if (type !== "dragDrop") {
          navigate(`/task/${id}`);
        }
      }}
      ref={drag}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: type === "dragDrop" ? "move" : "pointer",
        transform: isDragging ? "scale(0.8)" : "scale(1)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <h4>{title}</h4>

      {/* <label className="status-label">
        <select
          value={status}
          onChange={handleStatusChange}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label> */}
    </div>
  );
};

export default DashboardCard;
