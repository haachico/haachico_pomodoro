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
  const { id } = useParams<{ id: string }>();
  const task: Task | undefined = tasks.find((task) => task.id === id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  console.log(task, "task detai");

  const handleClose = () => {
    setOpenPomodoro(false);
    setEditPopup(false);
  };

  const handleDeleteTask = async () => {
    try {
      await dispatch(deleteTaskThunk(id as string));
      navigate("/pomodoros/dashboard");
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
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
    <div className="details-page">
      {showNote && !task?.isPomodoroAllowed  && (
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
      
      <div>
      <h1> {task?.title}</h1>
      <p>{task?.description}</p>
      <p>Due date : {formatDueDate(task?.dueDate)}</p>
      </div>
      <div className="details-page-buttons">
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
          navigate(`/editTask/${id}`);
        }}
      >
        Edit task
      </button>
      </div>
    </div>
  );
};

export default DetailsPage;
