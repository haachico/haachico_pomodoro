import "./index.css";

type DashboardCardProps = {
  title: string;
  status: string;
  priority: string;
};

const DashboardCard = ({ title, status, priority }: DashboardCardProps) => {
  return (
    <div className="dashboard-card">
      <h4>{title}</h4>
    </div>
  );
};

export default DashboardCard;
