import { useNavigate, useParams } from "react-router-dom";
// import tasks from "../../db/tasksData";
import { useEffect, useState } from "react";
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
  const [showNote, setShowNote] = useState(false);

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { id: taskId } = useParams<{ id: string }>();
  const task: Task | undefined = tasks.find((task) => task.id === taskId);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  console.log(task, "task detai");

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

  useEffect(() => {
    const showNotification = setTimeout(() => {
      setShowNote(true);
      setTimeout(() => {
        setShowNote(false);
      }, 5000);
    }, 5000);

    return () => clearTimeout(showNotification);
  }, []);
  return (
    <div>
      {showNote && (
        <div className="notification">
          NOTE: If you want to gain access for pomodoro for this task, kindly
          edit and allow pomodoro for this task
        </div>
      )}
      {/* {showEditPopup && task && (
        <div className="editPopup-modal">
          <EditPopup task={task} onClose={handleClose} />
        </div>
      )} */}
      {openPomodoro && (
        <div className="pomodoro-modal">
          <PomodoroPopup onClose={handleClose} task={task as Task} />
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
      {task?.isPomodoroAllowed && (
        <button
          onClick={() => {
            setOpenPomodoro(true);
          }}
        >
          Open Pomodoro
        </button>
      )}
      <button
        onClick={() => {
          setDeletePopup(true);
        }}
      >
        Delete task
      </button>
      <button
        onClick={() => {
          navigate(`/editTask/${taskId}`);
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
