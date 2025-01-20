import "./index.css";
import Dropdown from "../../commonComponents/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Task } from "../../../types";

type TaskStatusProps = {
  filters: {
    isStatusFilterOpen: boolean;
    isPriorityFilterOpen: boolean;
    selectedStatus: string;
    selectedPriority: string;
  };
  setFilter: (key: string, value: any) => void;
  payload: Task;
  setPayload: React.Dispatch<React.SetStateAction<Task>>;
};
const TaskStatus: React.FC<TaskStatusProps> = ({
  filters,
  setFilter,
  payload,
  setPayload,
}) => {
  const {
    // isStatusFilterOpen,
    isPriorityFilterOpen,
    // selectedStatus,
    selectedPriority,
  } = filters;
  // const statuses: string[] = ["All", "Pending", "Completed", "In Progress"];

  const priority: string[] = ["Low", "Medium", "High"];

  const normalisedStatus = (str: string): string =>
    str.includes("-")
      ? str.split("-").join("").toLowerCase()
      : str.split(" ").join("").toLowerCase();
  return (
    <div className="form-status">
      <div>
        {/* <Dropdown
          label={"Status"}
          onToggle={() => setFilter("isStatusFilterOpen", !isStatusFilterOpen)}
          isOpen={isStatusFilterOpen}
          options={statuses}
          selectOption={(option) => {
            setFilter("selectedStatus", option);
            setFilter("isStatusFilterOpen", false);
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
            setFilter("selectedPriority", option);
            setFilter("isPriorityFilterOpen", false);
          }}
          selectedOption={selectedPriority}
          normalisedStatus={normalisedStatus}
        />
      </div>
      <div>
        <div>
          <DatePicker
            name="dueDatea"
            value={payload.dueDate}
            selected={payload.dueDate}
            onChange={(date) => handleChange(date)}
          />
        </div>
        <div>
          <label htmlFor="pomodorosCount">Number of Pomodoros : </label>
          <input
            name="pomodoroCount"
            type="number"
            id="pomodorosCount"
            value={payload.pomodoroCount}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
