import { useEffect, useRef, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import tasks from "../../db/tasksData";
import "./index.css";
import { useLocation } from "react-router-dom";

const ViewAllTasks = () => {
  const location = useLocation();
  const status = location.state?.status || "All";

  const [filters, setFilters] = useState({
    isStatusFilterOpen: false,
    isPriorityFilterOpen: false,
    isSearchBarOpen: false,
    selectedStatus: status || "All",
    selectedPriority: "All",
  });

  const setFilter = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const {
    isStatusFilterOpen,
    isPriorityFilterOpen,
    isSearchBarOpen,
    selectedStatus,
    selectedPriority,
  } = filters;

  const statusDropdownRef = useRef<HTMLDivElement | null>(null);
  const priorityDropdownRef = useRef<HTMLDivElement | null>(null);
  const [inputField, setInputField] = useState<string>("");

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(e.target as Node)
      ) {
        setFilter("isStatusFilterOpen", false);
      }

      if (
        priorityDropdownRef.current &&
        !priorityDropdownRef.current.contains(e.target as Node)
      ) {
        setFilter("isPriorityFilterOpen", false);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField(e.target.value);
  };

  const searchedTasks = displayTasks.filter((task) =>
    task.title.toLowerCase().includes(inputField.toLowerCase())
  );

  const handleClearFilters = () => {
    setFilter("selectedStatus", "All");
    setFilter("selectedPriority", "All");
    setFilter("isStatusFilterOpen", false);
    setFilter("isPriorityFilterOpen", false);
    setFilter("isSearchBarOpen", false);
    setInputField("");
  };

  return (
    <div className="viewAll-page">
      <nav className="filters-nav">
        <div>
          <div ref={statusDropdownRef}>
            <h4
              onClick={() => {
                setFilter("isStatusFilterOpen", !isStatusFilterOpen);
                setFilter("isPriorityFilterOpen", false);
              }}
            >
              Status
            </h4>
            {isStatusFilterOpen && (
              <div className="drop-down">
                {statuses.map((status) => (
                  <p
                    onClick={() => {
                      setFilter("selectedStatus", status);
                      setFilter("isStatusFilterOpen", false);
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
                setFilter("isPriorityFilterOpen", !isPriorityFilterOpen);
                setFilter("isStatusFilterOpen", false);
              }}
            >
              Priority
            </h4>
            {isPriorityFilterOpen && (
              <div className="drop-down">
                {priority.map((priority) => (
                  <p
                    onClick={() => {
                      setFilter("selectedPriority", priority);
                      setFilter("isPriorityFilterOpen", false);
                    }}
                    style={{
                      border:
                        priority.toLowerCase() ===
                        selectedPriority.toLowerCase()
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
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {(selectedStatus !== "All" ||
            selectedPriority !== "All" ||
            inputField) && <div onClick={handleClearFilters}>Clear</div>}
          <div
            onClick={() => {
              setFilter("isSearchBarOpen", !isSearchBarOpen);
            }}
          >
            Search
          </div>
        </div>
      </nav>
      <div>
        {isSearchBarOpen && (
          <input
            onChange={handleSearch}
            className="search-bar"
            type="text"
            placeholder="Search tasks"
            value={inputField}
          />
        )}
      </div>
      <div
        className="viewAll-div"
        style={{
          opacity: isStatusFilterOpen || isPriorityFilterOpen ? 0.2 : 1,
        }}
      >
        {searchedTasks.length > 0
          ? searchedTasks.map((task) => (
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
