import "./index.css";
import Dropdown from "../../commonComponents/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateTaskType } from "../../../types";
import { Timestamp } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
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
  setFilter: (key: string, value: any) => void;
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
    isStatusFilterOpen,
    isPriorityFilterOpen,
    isCategoryFilterOpen,
    selectedStatus,
    selectedPriority,
    selectedCategory,
  } = filters;

  // const [allowPomodoro, setAllowPomodoro] = useState<boolean>(false);

  const statuses: string[] = ["Pending", "Completed", "In Progress"];

  const priority: string[] = ["Low", "Medium", "High"];

  const categories: string[] = ["Work", "Personal", "Study"];

  const normalisedStatus = (str: string): string =>
    str.includes("-")
      ? str.split("-").join("").toLowerCase()
      : str.split(" ").join("").toLowerCase();

  return (
    <div className="form-status">
      <div className="`dropdown-container`">
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
          selectedOption={selectedCategory}
          normalisedStatus={normalisedStatus}
        />
        {/* <Dropdown
          label={"Status"}
          onToggle={() => setFilter("isStatusFilterOpen", !isStatusFilterOpen)}
          isOpen={isStatusFilterOpen}
          options={statuses}
          selectOption={(option) => {
            setPayload({
              ...payload,
              status: option.toLowerCase() as
                | "pending"
                | "completed"
                | "in progress",
            });
            setFilter("isStatusFilterOpen", false);
            setFilter("selectedStatus", option);
          }}
          selectedOption={selectedStatus}
          normalisedStatus={normalisedStatus}
        /> */}
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
          selectedOption={selectedPriority}
          normalisedStatus={normalisedStatus}
        />
      </div>
      <div className="date-container">
        <div>
          <DatePicker
            name="dueDate"
            value={
              payload.dueDate instanceof Timestamp
                ? payload.dueDate.toDate().toISOString().split("T")[0]
                : payload.dueDate
                ? payload.dueDate.toISOString().split("T")[0]
                : ""
            }
            selected={payload.dueDate as Date}
            onChange={(date) => {
              if (date) {
                setPayload({
                  ...payload,
                  dueDate: date,
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
          <div>
            <label htmlFor="pomodorosCount">Number of Pomodoros : </label>
            <input
              name="pomodoroCount"
              type="number"
              id="pomodorosCount"
              value={payload.pomodoroCount}
              onChange={(e) => {
                setPayload({
                  ...payload,
                  pomodoroCount: parseInt(e.target.value),
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
