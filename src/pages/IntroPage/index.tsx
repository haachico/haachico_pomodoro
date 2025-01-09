import { useNavigate } from "react-router";

function IntroPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>This is an intro page</h1>
      <button
        onClick={() => {
          navigate("/pomodoros/dashboard");
        }}
      >
        Lets start!
      </button>
    </div>
  );
}

export default IntroPage;
