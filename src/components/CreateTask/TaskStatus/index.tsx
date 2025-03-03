import "./index.css";
import Dropdown from "../../commonComponents/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateTaskType } from "../../../types";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // Import the CSS file for react-toggle

type TaskStatusProps = {
  filters: {
    isStatusFilterOpen: boolean;
    isPriorityFilterOpen: boolean;
    isCategoryFilterOpen: boolean;
    selectedStatus: string;
    selectedPriority: string;
    selectedCategory: string;
  };
  setFilter: (key: string, value: string | boolean) => void;
  payload: CreateTaskType;
  setPayload: React.Dispatch<React.SetStateAction<CreateTaskType>>;
};

const TaskStatus: React.FC<TaskStatusProps> = ({
  filters,
  setFilter,
  payload,
  setPayload,
}) => {
  const {
    isPriorityFilterOpen,
    isCategoryFilterOpen,
    selectedPriority,
    selectedCategory,
  } = filters;

  // const statuses: string[] = ["Pending", "Completed", "In Progress"];
  const priority: string[] = ["Low", "Medium", "High"];
  const categories: string[] = ["Work", "Personal", "Study"];

  const normalisedStatus = (str: string): string =>
    str.includes("-")
      ? str.split("-").join("").toLowerCase()
      : str.split(" ").join("").toLowerCase();

  return (
    <div className="form-status">
      <div className="dropdown-container">
        <Dropdown
          label={"Category"}
          onToggle={() =>
            setFilter("isCategoryFilterOpen", !isCategoryFilterOpen)
          }
          isOpen={isCategoryFilterOpen}
          options={categories}
          selectOption={(option) => {
            setPayload({
              ...payload,
              category: option.toLowerCase() as "study" | "work" | "personal",
            });
            setFilter("isCategoryFilterOpen", false);
            setFilter("selectedCategory", option);
          }}
          selectedOption={payload.category || selectedCategory}
          normalisedStatus={normalisedStatus}
          source={"createTask"}
        />
        <Dropdown
          label={"Priority"}
          onToggle={() =>
            setFilter("isPriorityFilterOpen", !isPriorityFilterOpen)
          }
          isOpen={isPriorityFilterOpen}
          options={priority}
          selectOption={(option) => {
            setPayload({
              ...payload,
              priority: option.toLowerCase() as "low" | "medium" | "high",
            });
            setFilter("isPriorityFilterOpen", false);
            setFilter("selectedPriority", option);
          }}
          selectedOption={payload.priority || selectedPriority}
          normalisedStatus={normalisedStatus}
          source={"createTask"}
        />
      </div>
      <div className="date-container">
        <div className="date-picker">
          <label htmlFor="dueDate">Due Date</label>
          <DatePicker
            id="dueDate"
            name="dueDate"
            value={
              typeof payload.dueDate === "string"
                ? payload.dueDate.split("T")[0]
                : ""
            }
            selected={
              payload.dueDate ? new Date(payload.dueDate as string) : null
            }
            onChange={(date) => {
              if (date) {
                setPayload({
                  ...payload,
                  dueDate: date.toISOString(),
                });
              } else {
                setPayload({
                  ...payload,
                  dueDate: null,
                });
              }
            }}
          />
        </div>
        <div className="toggle-container">
          <label>
            <span>Allow Pomodoro</span>
            <Toggle
              defaultChecked={payload.isPomodoroAllowed}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPayload({
                  ...payload,
                  isPomodoroAllowed: e.target.checked,
                });
              }}
            />
          </label>
        </div>
        {payload.isPomodoroAllowed && (
          <div className="pomodoro-input">
            <label htmlFor="pomodorosTarget">Number of Pomodoros</label>
            <input
              name="pomodoroTarget"
              type="number"
              id="pomodorosTarget"
              value={payload.pomodoroTarget}
              onChange={(e) => {
                setPayload({
                  ...payload,
                  pomodoroTarget: parseInt(e.target.value),
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskStatus;
