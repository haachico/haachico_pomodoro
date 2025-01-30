import { useEffect, useState } from "react";
import TaskDescription from "../../components/CreateTask/TaskDescription";
import TaskStatus from "../../components/CreateTask/TaskStatus";
import "./index.css";
import { Task, Filters } from "../../types";
import { add } from "../../redux/tasks/tasksSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    isStatusFilterOpen: false,
    isPriorityFilterOpen: false,
    selectedStatus: "",
    selectedPriority: "",
    selectedCategory: "",
  });
  const [enableNextBtn, setEnableNextBtn] = useState<boolean>(false);

  const [payload, setPayload] = useState<Task>({
    id: "",
    title: "",
    description: "",
    status: filters.selectedStatus,
    pomodoroCount: 0,
    completedPomodoros: 0,
    dueDate: new Date(),
    priority: filters.selectedPriority,
    category: filters.selectedCategory,
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const navigate = useNavigate();

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

    if (step === 2) {
      if (payload.priority !== "") {
        setEnableNextBtn(true);
      } else {
        setEnableNextBtn(false);
      }
    }
  }, [payload, step, filters]);

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

  const handleCreateTask = () => {
    const newTask: Task = {
      ...payload,
      id: uuidv4(),
    };

    dispatch(add(newTask));
    navigate("/pomodoros/dashboard");
  };

  console.log(store, "store");

  return (
    <div className="create-page">
      <div className="stepper">
        <button onClick={handlePrevClick}>Previous</button>

        {step === 2 && (
          <>
            <button onClick={handleCreateTask} disabled={!enableNextBtn}>
              Create
            </button>
          </>
        )}
        {step !== 2 && (
          <button onClick={handleNextClick} disabled={!enableNextBtn}>
            Next
          </button>
        )}
      </div>
      <div>
        <div>{displayComponent()}</div>
      </div>
    </div>
  );
};

export default CreateTask;
