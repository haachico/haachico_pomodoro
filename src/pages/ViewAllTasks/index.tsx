import { useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import tasks from "../../db/tasksData";
import "./index.css";

const ViewAllTasks = () => {
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isPriorityFilterOpen, setIsPriorityFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const statuses: string[] = ["All", "Pending", "Completed", "In Progress"];

  const priority: string[] = ["Low", "Medium", "High"];

  const displayTasks = tasks.filter((task) => {
    if (selectedPriority === "all" && selectedStatus === "all") {
      return true;
    }
    if (selectedPriority === "all" && selectedStatus !== "all") {
      return task.status === selectedStatus;
    }
    if (selectedPriority !== "all" && selectedStatus === "all") {
      return task.priority === selectedPriority;
    }
    return task.priority === selectedPriority && task.status === selectedStatus;
  });

  return (
    <div className="viewAll-page">
      <nav>
        <div>
          <h4
            onClick={() => {
              setIsStatusFilterOpen((prev) => !prev);
              setIsPriorityFilterOpen(false);
            }}
          >
            Status
          </h4>
          {isStatusFilterOpen && (
            <div className="drop-down">
              {statuses.map((status) => (
                <p
                  onClick={() => {
                    setSelectedStatus(status);
                    setIsStatusFilterOpen(false);
                  }}
                >
                  {status}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4
            onClick={() => {
              setIsPriorityFilterOpen((prev) => !prev);
              setIsStatusFilterOpen(false);
            }}
          >
            Priority
          </h4>
          {isPriorityFilterOpen && (
            <div className="drop-down">
              {priority.map((priority) => (
                <p
                  onClick={() => {
                    setSelectedPriority(priority);
                    setIsPriorityFilterOpen(false);
                  }}
                >
                  {priority}
                </p>
              ))}
            </div>
          )}
        </div>
      </nav>
      <div
        className="viewAll-div"
        style={{
          opacity: isStatusFilterOpen || isPriorityFilterOpen ? 0.2 : 1,
        }}
      >
        {displayTasks.map((task) => (
          <DashboardCard
            title={task.title}
            status={task.status}
            priority={task.priority}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewAllTasks;
