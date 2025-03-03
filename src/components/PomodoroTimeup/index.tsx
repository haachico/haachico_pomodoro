import "./index.css";

type PomodoroTimeupProps = {
  setTimeLeft: (time: number) => void;
  setShortBreakTimeLeft: (time: number) => void;
  setLongBreakTimeLeft: (time: number) => void;
  isPomodoroTime: boolean;
  isShortBreak: boolean;
  isLongBreak: boolean;
  setShowNotification: (show: boolean) => void;
  stopSound: () => void;
};

const PomodoroTimeup: React.FC<PomodoroTimeupProps> = ({
  setTimeLeft,
  setShortBreakTimeLeft,
  setLongBreakTimeLeft,
  isPomodoroTime,
  isShortBreak,
  isLongBreak,
  setShowNotification,
  stopSound,
}) => {
  return (
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
        className="close-button"
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
  );
};

export default PomodoroTimeup;
