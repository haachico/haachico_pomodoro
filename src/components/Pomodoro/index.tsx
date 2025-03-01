import { useEffect, useRef, useState } from "react";
import "./index.css";
import { set } from "react-datepicker/dist/date_utils";
import { Task } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { editTaskThunk } from "../../redux/tasks/tasksSlice";
import pomodoroSound from "../../assets/audio/pomodoro.mp3";
import { useNavigate } from "react-router-dom";

type PomodoroPopupProps = {
  onClose: () => void;
  isFullPage?: boolean;
  task?: Task;
};

const PomodoroPopup: React.FC<PomodoroPopupProps> = ({
  onClose,
  isFullPage,
  task,
}) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPomodoroTime, setIsPomodoroTime] = useState(true);
  const [isShortBreak, setIsShortBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [shortbreakTImeLeft, setShortBreakTimeLeft] = useState(5 * 60);
  const [longBreakTimeLeft, setLongBreakTimeLeft] = useState(15 * 60);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const navigate = useNavigate();

  const storedPomodoroCount = task && task.pomodoroCount;

  const [pomodoroCount, setPomodoroCount] = useState(storedPomodoroCount || 0);

  const audioRef = useRef(new Audio(pomodoroSound));

  const playSound = () => {
    audioRef.current.play();
  };

  const stopSound = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };
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
        playSound();
        setIsTimerActive(false);
        setShowNotification(true);
      }
    }

    return () => {
      clearTimeout(timer);
      setEndTime(new Date());
    };
  }, [timeLeft, shortbreakTImeLeft, longBreakTimeLeft, isTimerActive]);

  useEffect(() => {
    const updateTask = async () => {
      if (timeLeft === 0 && isPomodoroTime) {
        setPomodoroCount((prevCount) => {
          const newCount = prevCount + 1;

          if (task) {
            dispatch(
              editTaskThunk({
                ...(task as Task),
                status: "in progress",
                pomodoroCount: newCount,
              })
            );
          }
          return newCount;
        });

        setTimeLeft(25 * 60);
        setIsShortBreak(true);
      }
    };
    updateTask();
  }, [pomodoroCount, dispatch, task, timeLeft, isPomodoroTime]);

  const handleTimeFormat = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}: ${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`${isFullPage ? "pomodoro-page" : "pomodoro-popup"}`}
      style={{ position: "relative" }}
    >
      {!isFullPage && (
        <button
          className="close-pomodoro-button"
          style={{
            position: "absolute",
            right: "4px",
            top: "4px",
          }}
          onClick={async () => {
            setShowNotification(false);
            setIsTimerActive(false);

            setEndTime(new Date());

            if (task && startTime) {
              const endTime = new Date();
              const duration = (endTime.getTime() - startTime.getTime()) / 1000;

              await dispatch(
                editTaskThunk({
                  ...(task as Task),
                  status: "in progress",
                  pomodoroSessions: [
                    ...(task.pomodoroSessions || []),
                    {
                      startTime: startTime.toISOString(),
                      endTime: endTime.toISOString(),
                      duration,
                    },
                  ],
                })
              );
            }
            onClose();
            navigate(`/task/${task?.id}`);
          }}
        >
          X
        </button>
      )}
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
        <h1
          className="time-display"
          style={{ fontSize: isFullPage ? "200px" : "100px" }}
        >
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
              setStartTime(new Date());
              await dispatch(
                editTaskThunk({
                  ...(task as Task),
                  status: "in progress",
                })
              );
              setIsTimerActive(true);
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
                stopSound();
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
      <div className="spotify-embed">
        <iframe
          // style="border-radius:12px"
          src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator"
          width="50%"
          height="352"
          frameBorder="0"
          // allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
export default PomodoroPopup;
