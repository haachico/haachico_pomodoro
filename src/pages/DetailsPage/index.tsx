import { useParams } from "react-router-dom";
import tasks from "../../db/tasksData";
import { useState } from "react";
import PomodoroPopup from "../../components/Pomodoro";
import "./index.css";

const DetailsPage = () => {
  const [openPomodoro, setOpenPomodoro] = useState(false);
  const { id } = useParams<{ id: string }>();
  const task = tasks.find((task) => task.id === id);
  return (
    <div>
      {openPomodoro && (
        <div className="pomodoro-modal">
          <PomodoroPopup />
        </div>
      )}
      <button
        onClick={() => {
          setOpenPomodoro(true);
        }}
      >
        Open Pomodoro
      </button>
      <h1> {task?.title}</h1>
      <p>{task?.description}</p>
    </div>
  );
};

export default DetailsPage;
