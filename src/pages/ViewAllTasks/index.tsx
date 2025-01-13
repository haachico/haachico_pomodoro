import { useEffect, useRef, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import tasks from "../../db/tasksData";
import "./index.css";
import { useLocation } from "react-router-dom";

const ViewAllTasks = () => {
  const location = useLocation();

  const status = location.state?.status || "All";
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState<boolean>(false);
  const [isPriorityFilterOpen, setIsPriorityFilterOpen] =
    useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>(status || "All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const statusDropdownRef = useRef<HTMLDivElement | null>(null);
  const priorityDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(e.target as Node)
      ) {
        setIsStatusFilterOpen(false);
      }

      if (
        priorityDropdownRef.current &&
        !priorityDropdownRef.current.contains(e.target as Node)
      ) {
        setIsPriorityFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const statuses: string[] = ["All", "Pending", "Completed", "In Progress"];

  const priority: string[] = ["Low", "Medium", "High"];

  const normalisedStatus = (str: string): string =>
    str.includes("-")
      ? str.split("-").join("").toLowerCase()
      : str.split(" ").join("").toLowerCase();

  const displayTasks = tasks.filter((task) => {
    if (selectedPriority === "All" && selectedStatus === "All") {
      return task;
    }
    if (selectedPriority === "All" && selectedStatus !== "All") {
      return normalisedStatus(task.status) === normalisedStatus(selectedStatus);
    }
    if (selectedPriority !== "All" && selectedStatus === "All") {
      return task.priority.toLowerCase() === selectedPriority.toLowerCase();
    }
    return (
      task.priority.toLowerCase() === selectedPriority.toLowerCase() &&
      normalisedStatus(task.status) === normalisedStatus(selectedStatus)
    );
  });

  return (
    <div className="viewAll-page">
      <nav>
        <div ref={statusDropdownRef}>
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
                  style={{
                    border:
                      normalisedStatus(status) ===
                      normalisedStatus(selectedStatus)
                        ? "1px solid #000"
                        : "none",
                  }}
                >
                  {status}
                </p>
              ))}
            </div>
          )}
        </div>
        <div ref={priorityDropdownRef}>
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
                  style={{
                    border:
                      priority.toLowerCase() === selectedPriority.toLowerCase()
                        ? "1px solid #000"
                        : "none",
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
        {displayTasks.length > 0
          ? displayTasks.map((task) => (
              <DashboardCard
                title={task.title}
                status={task.status}
                priority={task.priority}
                id={task.id}
              />
            ))
          : "No tasks found"}
      </div>
    </div>
  );
};

export default ViewAllTasks;
