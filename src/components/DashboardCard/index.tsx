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
  return (
    <div
      className="dashboard-card"
      onClick={() => {
        navigate(`/task/${id}`);
      }}
    >
      <h4 className={`${status}`}>{title}</h4>
    </div>
  );
};

export default DashboardCard;
