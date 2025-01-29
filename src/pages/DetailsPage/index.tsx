import { useNavigate, useParams } from "react-router-dom";
// import tasks from "../../db/tasksData";
import { useState } from "react";
import PomodoroPopup from "../../components/Pomodoro";
import "./index.css";
import { remove } from "../../redux/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../types";
import DeletePopup from "../../components/DeletePopup";
import EditPopup from "../../components/EditPopup";
import { RootState } from "../../store";

const DetailsPage = () => {
  const [openPomodoro, setOpenPomodoro] = useState(false);
  const [showDeletePopup, setDeletePopup] = useState(false);
  const [showEditPopup, setEditPopup] = useState(false);

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { id } = useParams<{ id: string }>();
  const task: Task | undefined = tasks.find((task) => task.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenPomodoro(false);
    setEditPopup(false);
  };

  const handleDeleteTask = () => {
    if (id) {
      dispatch(remove(id));
      navigate("/pomodoros/dashboard");
    }
  };
  return (
    <div>
      {showEditPopup && task && (
        <div className="editPopup-modal">
          <EditPopup task={task} onClose={handleClose} />
        </div>
      )}
      {openPomodoro && (
        <div className="pomodoro-modal">
          <PomodoroPopup onClose={handleClose} />
        </div>
      )}
      {showDeletePopup && (
        <div className="deletePopup-div">
          <DeletePopup
            handleDelete={handleDeleteTask}
            handleCancel={() => setDeletePopup(false)}
          />
        </div>
      )}
      <button
        onClick={() => {
          setOpenPomodoro(true);
        }}
      >
        Open Pomodoro
      </button>
      <button
        onClick={() => {
          setDeletePopup(true);
        }}
      >
        Delete task
      </button>
      <button
        onClick={() => {
          setEditPopup(true);
        }}
      >
        Edit task
      </button>
      <h1> {task?.title}</h1>
      <p>{task?.description}</p>
    </div>
  );
};

export default DetailsPage;
