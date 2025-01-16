import Dropdown from "../../commonComponents/Dropdown";

type TaskStatusProps = {
  filters: {
    isStatusFilterOpen: boolean;
    isPriorityFilterOpen: boolean;
    selectedStatus: string;
    selectedPriority: string;
  };
  setFilter: (key: string, value: any) => void;
};
const TaskStatus: React.FC<TaskStatusProps> = ({ filters, setFilter }) => {
  const {
    isStatusFilterOpen,
    isPriorityFilterOpen,
    selectedStatus,
    selectedPriority,
  } = filters;
  const statuses: string[] = ["All", "Pending", "Completed", "In Progress"];

  const priority: string[] = ["Low", "Medium", "High"];

  const normalisedStatus = (str: string): string =>
    str.includes("-")
      ? str.split("-").join("").toLowerCase()
      : str.split(" ").join("").toLowerCase();
  return (
    <div className="form-status">
      <Dropdown
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
  );
};

export default TaskStatus;
