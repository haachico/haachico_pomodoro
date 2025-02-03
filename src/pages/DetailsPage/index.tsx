import { useNavigate, useParams } from "react-router-dom";
// import tasks from "../../db/tasksData";
import { useState } from "react";
import PomodoroPopup from "../../components/Pomodoro";
import "./index.css";
import { deleteTaskThunk } from "../../redux/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../types";
import DeletePopup from "../../components/DeletePopup";
import EditPopup from "../../components/EditPopup";
import { AppDispatch, RootState } from "../../store";

const DetailsPage = () => {
  const [openPomodoro, setOpenPomodoro] = useState(false);
  const [showDeletePopup, setDeletePopup] = useState(false);
  const [showEditPopup, setEditPopup] = useState(false);

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { id: taskId } = useParams<{ id: string }>();
  const task: Task | undefined = tasks.find((task) => task.id === taskId);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenPomodoro(false);
    setEditPopup(false);
  };

  const handleDeleteTask = async () => {
    try {
      await dispatch(deleteTaskThunk(taskId as string));
      navigate("/pomodoros/dashboard");
    } catch (error) {
      console.error("Error deleting task", error);
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
