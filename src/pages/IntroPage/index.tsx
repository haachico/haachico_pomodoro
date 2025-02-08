import { useNavigate } from "react-router-dom";
import "./index.css";
import PomodoroPopup from "../../components/Pomodoro";
import { useState } from "react";
import { set } from "react-datepicker/dist/date_utils";

function IntroPage() {
  const navigate = useNavigate();
  const [showPomodoro, setShowPomodoro] = useState(false);
  return (
    <div className="intro-page">
      {showPomodoro && (
        <div className="pomodoro-modal">
          <PomodoroPopup
            onClose={() => {
              setShowPomodoro(false);
            }}
          />
        </div>
      )}
      <h1>Welcome to your productivity app!</h1>
      <div className="intro-buttons">
        <button
          onClick={() => {
            navigate("/pomodoros/dashboard");
          }}
        >
          Get Started with our task manager!
        </button>
        <button
          onClick={() => {
            navigate("/pomodoro");
          }}
        >
          Use Pomodoro!
        </button>
      </div>
    </div>
  );
}
export default IntroPage;
