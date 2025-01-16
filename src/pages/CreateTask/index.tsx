import { useState } from "react";
import TaskDescription from "../../components/CreateTask/TaskDescription";
import TaskStatus from "../../components/CreateTask/TaskStatus";
import "./index.css";

const CreateTask = () => {
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState({
    isStatusFilterOpen: false,
    isPriorityFilterOpen: false,
    selectedStatus: "",
    selectedPriority: "",
  });

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
        return <TaskDescription />;
      case 2:
        return <TaskStatus filters={filters} setFilter={setFilter} />;
      default:
        return <TaskDescription />;
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
    }
  };

  const handleCreateTask = () => {
    console.log("task created!");
  };
  return (
    <div className="create-page">
      <div className="stepper">
        <button onClick={handlePrevClick}>Previous</button>
        <button onClick={step === 2 ? handleCreateTask : handleNextClick}>
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
