import { useEffect, useRef, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import "./index.css";
import { useLocation } from "react-router-dom";
import Dropdown from "../../components/commonComponents/Dropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ViewAllTasks = () => {
  const location = useLocation();
  const status = location.state?.status || "All";

  const tasksList = useSelector((state: RootState) => state.tasks.tasks);

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

  const serarchBarRef = useRef<HTMLDivElement | null>(null);
  const [inputField, setInputField] = useState<string>("");

  const statuses: string[] = ["All", "Pending", "Completed", "In Progress"];

  const priority: string[] = ["Low", "Medium", "High"];

  console.log(tasksList, "check tasks list");

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        serarchBarRef.current &&
        !serarchBarRef.current.contains(e.target as Node)
      ) {
        setFilter("isSearchBarOpen", false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const normalisedStatus = (str: string): string =>
    str.includes("-")
      ? str.split("-").join("").toLowerCase()
      : str.split(" ").join("").toLowerCase();

  const displayTasks = tasksList.filter((task) => {
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
          <Dropdown
            label={"Status"}
            onToggle={() =>
              setFilter("isStatusFilterOpen", !isStatusFilterOpen)
            }
            isOpen={isStatusFilterOpen}
            options={statuses}
            selectOption={(option) => {
              setFilter("selectedStatus", option);
              setFilter("isStatusFilterOpen", false);
            }}
            selectedOption={selectedStatus}
            normalisedStatus={normalisedStatus}
          />
          <Dropdown
            label={"Priority"}
            onToggle={() =>
              setFilter("isPriorityFilterOpen", !isPriorityFilterOpen)
            }
            isOpen={isPriorityFilterOpen}
            options={priority}
            selectOption={(option) => {
              setFilter("selectedPriority", option);
              setFilter("isPriorityFilterOpen", false);
            }}
            selectedOption={selectedStatus}
            normalisedStatus={normalisedStatus}
          />
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
      <div ref={serarchBarRef}>
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
