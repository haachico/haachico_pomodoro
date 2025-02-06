import { useEffect, useState } from "react";
import "./index.css";
import { set } from "react-datepicker/dist/date_utils";
import { Task } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { editTaskThunk } from "../../redux/tasks/tasksSlice";

type PomodoroPopupProps = {
  onClose: () => void;
  task: Task;
};

const PomodoroPopup: React.FC<PomodoroPopupProps> = ({ onClose, task }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPomodoroTime, setIsPomodoroTime] = useState(true);
  const [isShortBreak, setIsShortBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [shortbreakTImeLeft, setShortBreakTimeLeft] = useState(5 * 60);
  const [longBreakTimeLeft, setLongBreakTimeLeft] = useState(15 * 60);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive) {
      if (isPomodoroTime && timeLeft > 0) {
        timer = setTimeout(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else if (isShortBreak && shortbreakTImeLeft > 0) {
        timer = setTimeout(() => {
          setShortBreakTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else if (isLongBreak && longBreakTimeLeft > 0) {
        timer = setTimeout(() => {
          setLongBreakTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        setIsTimerActive(false);
        setShowNotification(true);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft, shortbreakTImeLeft, longBreakTimeLeft, isTimerActive]);

  const handleTimeFormat = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}: ${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="pomodoro-popup" style={{ position: "relative" }}>
      <button
        style={{
          position: "absolute",
          right: "4px",
          top: "4px",
        }}
        onClick={() => {
          setShowNotification(false);
          setIsTimerActive(false);
          onClose();
        }}
      >
        X
      </button>
      <div className="pomodoro-popup__header">
        <h4
          onClick={() => {
            setIsPomodoroTime(true);
            setIsShortBreak(false);
            setIsLongBreak(false);
            setShortBreakTimeLeft(5 * 60);
            setLongBreakTimeLeft(15 * 60);
            setIsTimerActive(false);
          }}
        >
          Timer
        </h4>
        <h4
          onClick={() => {
            setIsPomodoroTime(false);
            setIsShortBreak(true);
            setIsLongBreak(false);
            setTimeLeft(25 * 60);
            setLongBreakTimeLeft(15 * 60);
            setIsTimerActive(false);
          }}
        >
          Short break
        </h4>
        <h4
          onClick={() => {
            setIsPomodoroTime(false);
            setIsShortBreak(false);
            setIsLongBreak(true);
            setTimeLeft(25 * 60);
            setShortBreakTimeLeft(5 * 60);
            setIsTimerActive(false);
          }}
        >
          Long break
        </h4>
      </div>
      <div className="pomodoro-popup__timer">
        <h1>
          {isPomodoroTime
            ? handleTimeFormat(timeLeft)
            : isLongBreak
            ? handleTimeFormat(longBreakTimeLeft)
            : isShortBreak
            ? handleTimeFormat(shortbreakTImeLeft)
            : ""}
        </h1>
        <div className="pomodoro-popup__timer__buttons">
          <button
            onClick={async () => {
              setIsTimerActive(true);
              dispatch(
                editTaskThunk({
                  ...task,
                  status: "in progress",
                })
              );
            }}
          >
            Start
          </button>
          <button
            onClick={() => {
              setIsTimerActive(false);
              setTimeLeft(25 * 60);
              setShortBreakTimeLeft(5 * 60);
              setLongBreakTimeLeft(15 * 60);
            }}
          >
            Reset
          </button>
        </div>
        {showNotification && (
          <div className="notification">
            <h3>Time's up!</h3>
            <p>
              {" "}
              {isPomodoroTime
                ? "Pomodoro session is up! Time to take a break!"
                : isLongBreak || isShortBreak
                ? "Break is over! Time to get back to work"
                : ""}
            </p>
            <button
              onClick={() => {
                setShowNotification(false);
                if (isPomodoroTime) {
                  setTimeLeft(25 * 60);
                }
                if (isShortBreak) {
                  setShortBreakTimeLeft(5 * 60);
                }

                if (isLongBreak) {
                  setLongBreakTimeLeft(15 * 60);
                }
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default PomodoroPopup;
