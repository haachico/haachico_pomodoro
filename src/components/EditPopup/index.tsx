import { useState } from "react";
import { Task } from "../../types";
import DatePicker from "react-datepicker";
import Dropdown from "../commonComponents/Dropdown";
import {
  edit,
  editTaskThunk,
  fetchTasksThunk,
} from "../../redux/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { AppDispatch } from "../../store";
import Toggle from "react-toggle";
import "react-toggle/style.css";

type EditPopupProps = {
  task: Task;
  onClose: () => void;
};

const EditPopup: React.FC<EditPopupProps> = ({ task, onClose }) => {
  const [editDetials, setEditDetails] = useState<Task>({
    ...task,
    dueDate: new Date(task.dueDate as Date), // Ensure dueDate is a Date object
  });
  const [filters, setFilters] = useState({
    isStatusFilterOpen: false,
    isPriorityFilterOpen: false,
    isSearchBarOpen: false,
    isCategoryFilterOpen: false,
    selectedStatus: "All",
    selectedPriority: "",
    selectedCategory: "All",
  });

  const dispatch = useDispatch<AppDispatch>();

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
    selectedStatus,
    selectedPriority,
    selectedCategory,
  } = filters;

  const statuses: string[] = ["Pending", "Completed", "In Progress"];

  const priority: string[] = ["Low", "Medium", "High"];

  const categories: string[] = ["Work", "Personal", "Study"];

  // const normalisedStatus = (str: string): string =>
  //   str.includes("-")
  //     ? str.split("-").join("").toLowerCase()
  //     : str.split(" ").join("").toLowerCase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSaveDetails = async () => {
    try {
      await dispatch(editTaskThunk(editDetials));

      await dispatch(fetchTasksThunk());
      onClose();
    } catch (error) {
      console.error("Error editing task", error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          value={editDetials.title}
          id="title"
          placeholder="Title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          value={editDetials.description}
          id="description"
          placeholder="Description"
          onChange={handleChange}
        />
      </div>
      <div>
        <Dropdown
          label={"Category"}
          onToggle={() =>
            setFilter("isCategoryFilterOpen", !isCategoryFilterOpen)
          }
          isOpen={isCategoryFilterOpen}
          options={categories}
          selectOption={(option) => {
            setEditDetails((prevState) => {
              return {
                ...prevState,
                category: option.toLowerCase() as "work" | "personal" | "study",
              };
            });
            setFilter("isCategoryFilterOpen", false);
            setFilter("selectedCategory", option);
          }}
          selectedOption={editDetials.category || selectedCategory}
          // normalisedStatus={normalisedStatus}
        />
        {/* <Dropdown
          label={"Status"}
          onToggle={() => setFilter("isStatusFilterOpen", !isStatusFilterOpen)}
          isOpen={isStatusFilterOpen}
          options={statuses}
          selectOption={(option) => {
            setEditDetails((prevState) => {
              return {
                ...prevState,
                status: option,
              };
            });
            setFilter("isStatusFilterOpen", false);
            setFilter("selectedStatus", option);
          }}
          selectedOption={editDetials.status || selectedStatus}
          // normalisedStatus={normalisedStatus}
        /> */}
        <Dropdown
          label={"Priority"}
          onToggle={() =>
            setFilter("isPriorityFilterOpen", !isPriorityFilterOpen)
          }
          isOpen={isPriorityFilterOpen}
          options={priority}
          selectOption={(option) => {
            setEditDetails((prevState) => {
              return {
                ...prevState,
                priority: option as "low" | "medium" | "high",
              };
            });
            setFilter("isPriorityFilterOpen", false);
            setFilter("selectedPriority", option);
          }}
          selectedOption={editDetials.priority || selectedPriority}
          // normalisedStatus={normalisedStatus}
        />
      </div>
      <label>
        <span>Allow Pomodoro</span>
        <Toggle
          defaultChecked={editDetials.isPomodoroAllowed}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEditDetails((prevDetails) => {
              return {
                ...prevDetails,
                isPomodoroAllowed: e.target.checked,
              };
            });
          }}
        />
      </label>

      {editDetials.isPomodoroAllowed && (
        <div>
          <label htmlFor="pomodorosCount">Number of Pomodoros : </label>
          <input
            name="pomodoroCount"
            type="number"
            id="pomodorosCount"
            value={editDetials.pomodoroCount}
            onChange={(e) => {
              setEditDetails({
                ...editDetials,
                pomodoroCount: parseInt(e.target.value),
              });
            }}
          />
        </div>
      )}
      <div>
        <DatePicker
          name="dueDate"
          value={
            editDetials.dueDate instanceof Timestamp
              ? editDetials.dueDate.toDate().toISOString().split("T")[0]
              : editDetials.dueDate
              ? editDetials.dueDate.toISOString().split("T")[0]
              : ""
          }
          selected={editDetials.dueDate as Date}
          onChange={(date) => {
            setEditDetails((prevState) => {
              return {
                ...prevState,
                dueDate: date,
              };
            });
          }}
        />
      </div>

      <button onClick={handleSaveDetails}>Save</button>
      <button
        onClick={() => {
          onClose();
        }}
      >
        Close
      </button>
    </div>
  );
};

export default EditPopup;
