import { useEffect, useState } from "react";
import TaskDescription from "../../components/CreateTask/TaskDescription";
import TaskStatus from "../../components/CreateTask/TaskStatus";
import "./index.css";
import { Task } from "../../types";

const CreateTask = () => {
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState({
    isStatusFilterOpen: false,
    isPriorityFilterOpen: false,
    selectedStatus: "",
    selectedPriority: "",
  });
  const [enableNextBtn, setEnableNextBtn] = useState<boolean>(false);

  const [payload, setPayload] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    status: filters.selectedStatus,
    pomodoroCount: 0,
    completedPomodoros: 0,
    dueDate: new Date(),
    priority: "medium",
  });

  const {
    title,
    description,
    status,
    promodoroCount,
    completedPomodoros,
    dueDate,
    priority,
  } = payload;

  useEffect(() => {
    if (step === 1) {
      if (title.length > 0 && description.length > 0) {
        setEnableNextBtn(true);
      } else {
        setEnableNextBtn(false);
      }
    }
  }, [payload, step]);

  const setFilter = (key: string, value: any) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };
  const displayComponent = () => {
    switch (step) {
      case 1:
        return <TaskDescription payload={payload} setPayload={setPayload} />;
      case 2:
        return (
          <TaskStatus
            filters={filters}
            setFilter={setFilter}
            payload={payload}
            setPayload={setPayload}
          />
        );
      default:
        return <TaskDescription payload={payload} setPayload={setPayload} />;
    }
  };

  const handlePrevClick = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
      setEnableNextBtn(false);
    }
  };

  const handleCreateTask = () => {};
  return (
    <div className="create-page">
      <div className="stepper">
        <button onClick={handlePrevClick}>Previous</button>
        <button
          onClick={step === 2 ? handleCreateTask : handleNextClick}
          disabled={enableNextBtn === false}
        >
          {step === 2 ? "Create" : "Next"}
        </button>
      </div>
      <div>
        <div>{displayComponent()}</div>
      </div>
    </div>
  );
};

export default CreateTask;
