import { useEffect, useRef, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import "./index.css";
import { useLocation } from "react-router-dom";
import Dropdown from "../../components/commonComponents/Dropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ViewAllTasks = () => {
  const location = useLocation();
  const selectedStatusFilter = location.state?.status || "All";
  const selectedPriorityFilter = location.state?.priority || "";
  const selectedCategoryFilter = location.state?.category || "";

  const tasksList = useSelector((state: RootState) => state.tasks.tasks);

  const [filters, setFilters] = useState({
    isStatusFilterOpen: false,
    isPriorityFilterOpen: false,
    isSearchBarOpen: false,
    isCategoryFilterOpen: false,
    selectedStatus: selectedStatusFilter || "All",
    selectedPriority: selectedPriorityFilter || "",
    selectedCategory: selectedCategoryFilter || "All",
  });

  // console.log(tasksList, "check tasks list");

  const setFilter = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const {
    isStatusFilterOpen,
    isPriorityFilterOpen,
    isCategoryFilterOpen,
    isSearchBarOpen,
    selectedStatus,
    selectedPriority,
    selectedCategory,
  } = filters;

  const serarchBarRef = useRef<HTMLDivElement | null>(null);
  const [inputField, setInputField] = useState<string>("");

  const statuses: string[] = ["All", "Pending", "Completed", "In Progress"];

  const priority: string[] = ["Low", "Medium", "High"];

  const categories: string[] = ["All", "Work", "Personal", "Study"];

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

  console.log(selectedCategory, "cje");

  const displayTasks = tasksList.filter((task) => {
    const categoryMatch =
      selectedCategory === "All" ||
      task.category === selectedCategory.toLowerCase();
    const statusMatch =
      selectedStatus === "All" ||
      normalisedStatus(task.status) === normalisedStatus(selectedStatus);
    const priorityMatch =
      selectedPriority === "" ||
      task.priority === selectedPriority.toLowerCase();

    return categoryMatch && statusMatch && priorityMatch;
  });

  console.log(displayTasks, selectedStatusFilter, "check");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField(e.target.value);
  };

  const searchedTasks = displayTasks.filter((task) =>
    task.title.toLowerCase().includes(inputField.toLowerCase())
  );

  console.log(displayTasks);

  const handleClearFilters = () => {
    setFilter("selectedStatus", "All");
    setFilter("selectedPriority", "");
    setFilter("selectedCategory", "All");
    setFilter("isStatusFilterOpen", false);
    setFilter("isPriorityFilterOpen", false);
    setFilter("isCategoryFilterOpen", false);
    setFilter("isSearchBarOpen", false);
    setInputField("");
  };

  return (
    <div className="viewAll-page">
      <nav className="filters-nav">
        <div>
          <Dropdown
            label={"Category"}
            onToggle={() =>
              setFilter("isCategoryFilterOpen", !isCategoryFilterOpen)
            }
            isOpen={isCategoryFilterOpen}
            options={categories}
            selectOption={(option) => {
              setFilter("selectedCategory", option);
              setFilter("isCategoryFilterOpen", false);
            }}
            selectedOption={selectedCategory}
            normalisedStatus={normalisedStatus}
          />
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
            selectedOption={selectedPriority}
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
