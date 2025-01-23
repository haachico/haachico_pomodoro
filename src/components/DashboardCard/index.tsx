import { useNavigate } from "react-router-dom";
import "./index.css";

type DashboardCardProps = {
  title: string;
  status: string;
  priority: string;
  id: string;
};

const DashboardCard = ({ title, status, priority, id }: DashboardCardProps) => {
  const navigate = useNavigate();

  const priorityColors: {
    [key: string]: string;
  } = {
    low: "#28a745", // Green
    medium: "#ffc107", // Yellow
    high: "#dc3545", // Red
  };

  return (
    <div
      className="dashboard-card"
      style={{
        border: `2px solid ${priorityColors[priority]}`,
      }}
      onClick={() => {
        navigate(`/task/${id}`);
      }}
    >
      <h4 className={`${status === "in progress" ? "inProgress" : status}`}>
        {title}
      </h4>
    </div>
  );
};

export default DashboardCard;
