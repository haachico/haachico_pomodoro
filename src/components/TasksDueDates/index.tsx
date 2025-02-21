import React, { useState } from "react";
import "./index.css";
import { format, isSameMonth, addMonths } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

type TasksDueDatesProps = {
  onClose: () => void;
};

const TasksDueDates: React.FC<TasksDueDatesProps> = ({ onClose }) => {
  const tasksList = useSelector((state: RootState) => state.tasks.tasks);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const navigate = useNavigate();

  const currentMonth = addMonths(new Date(), currentMonthIndex);
  const currentMonthTasks =
    tasksList.filter((task) =>
      isSameMonth(new Date(task.dueDate as string), currentMonth)
    ) || [];

  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  return (
    <div className="tasks-due-dates-container">
      <h1>Tasks Due Dates</h1>
      <p>
        * Due dates are displayed for the current month and the next two months.
      </p>

      <h3>{monthName}</h3>
      <button
        className="date-prev-btn"
        onClick={() => {
          setCurrentMonthIndex(currentMonthIndex - 1);
        }}
        disabled={currentMonthIndex === 0}
      >
        Previous
      </button>
      <button
        className="date-next-btn"
        onClick={() => {
          setCurrentMonthIndex(currentMonthIndex + 1);
        }}
        disabled={currentMonthIndex === 3}
      >
        Next
      </button>
      <button onClick={onClose} className="dueDates-btn-close">
        x
      </button>
      <div className="tasks-due-dates">
        {currentMonthTasks.length > 0
          ? currentMonthTasks.map((task) => {
              return (
                <div
                  className="task-due-date"
                  key={task.id}
                  onClick={() => {
                    navigate(`/task/${task.id}`);
                  }}
                >
                  <p>{task.title}</p>
                  <p>
                    {format(new Date(task.dueDate as string), "dd-MM-yyyy")}
                  </p>
                </div>
              );
            })
          : "No tasks due this month"}
      </div>
    </div>
  );
};

export default TasksDueDates;
