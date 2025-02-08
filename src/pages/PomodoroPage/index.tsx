import PomodoroPopup from "../../components/Pomodoro";

const PomodoroPage = () => {
  return (
    <div>
      <PomodoroPopup onClose={() => null} isFullPage={true} />
    </div>
  );
};

export default PomodoroPage;
