import { useEffect, useState } from "react";
import TaskDescription from "../../components/CreateTask/TaskDescription";
import TaskStatus from "../../components/CreateTask/TaskStatus";
import "./index.css";
import { Task, Filters, CreateTaskType } from "../../types";
import { addTaskThunk, fetchTasksThunk } from "../../redux/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import "react-toggle/style.css"; // Import the CSS file for react-toggle
import { Box, Step, StepLabel, Stepper, StepButton } from "@mui/material";
// import { Timestamp } from "firebase/firestore";

const CreateTask = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    isStatusFilterOpen: false,
    isPriorityFilterOpen: false,
    isCategoryFilterOpen: false,
    selectedStatus: "",
    selectedPriority: "",
    selectedCategory: "",
  });
  const [enableNextBtn, setEnableNextBtn] = useState<boolean>(false);

  const [payload, setPayload] = useState<CreateTaskType>({
    // id: "",
    title: "",
    description: "",
    status: "Pending",
    pomodoroCount: 0,
    completedPomodoros: 0,
    dueDate: new Date(),
    priority: filters.selectedPriority,
    category: filters.selectedCategory,
    isPomodoroAllowed: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { title, description } = payload;

  console.log(payload, "payload");

  useEffect(() => {
    if (activeStep === 0) {
      if (title.length > 0 && description.length > 0) {
        setEnableNextBtn(true);
      } else {
        setEnableNextBtn(false);
      }
    }

    if (activeStep === 1) {
      if (payload.priority !== "") {
        setEnableNextBtn(true);
      } else {
        setEnableNextBtn(false);
      }
    }
  }, [payload, activeStep, filters]);

  const setFilter = (key: string, value: any) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const displayComponent = () => {
    switch (activeStep) {
      case 0:
        return <TaskDescription payload={payload} setPayload={setPayload} />;
      case 1:
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
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleCreateTask = async () => {
    const newTask: CreateTaskType = {
      ...payload,
    };

    try {
      const response = await dispatch(addTaskThunk(newTask));
      await dispatch(fetchTasksThunk());
      console.log("newTask", response);
      navigate("/pomodoros/dashboard");
      console.log("success");
    } catch (error) {
      console.error("Failed to create task:", error);
      console.log("error");
    }
  };

  const steps = ["Task Description", "Task Status"];

  return (
    <div className="create-page">
      <div className="navigation-buttons">
        <button onClick={handlePrevClick} disabled={activeStep === 0}>
          Previous
        </button>
        {activeStep === 1 ? (
          <button
            onClick={handleCreateTask}
            disabled={!enableNextBtn}
            style={{
              opacity: !enableNextBtn ? 0.5 : 1,
              cursor: !enableNextBtn ? "default" : "pointer",
            }}
          >
            Create Task
          </button>
        ) : (
          <button
            onClick={handleNextClick}
            disabled={!enableNextBtn}
            style={{
              opacity: !enableNextBtn ? 0.5 : 1,
              cursor: !enableNextBtn ? "default" : "pointer",
            }}
          >
            Next
          </button>
        )}
      </div>
      <div className="stepper">
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={activeStep > index}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div>
        <div>{displayComponent()}</div>
      </div>
    </div>
  );
};

export default CreateTask;
