import { useEffect, useState } from "react";
import "./index.css";

const PomodoroPopup = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft, isTimerActive]);

  const handleTimeFormat = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}: ${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="pomodoro-popup">
      <h1>{handleTimeFormat(timeLeft)}</h1>
      <button
        onClick={() => {
          setIsTimerActive(true);
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          setIsTimerActive(false);
          setTimeLeft(25 * 60);
        }}
      >
        Reset
      </button>
    </div>
  );
};
export default PomodoroPopup;
