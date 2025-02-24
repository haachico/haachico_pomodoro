import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PomodoroPopup from "../../components/Pomodoro";
import "./index.css";
import {
  deleteTaskThunk,
  getTaskDetails,
  getTaskDetailsThunk,
} from "../../redux/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../types";
import DeletePopup from "../../components/DeletePopup";
import { AppDispatch } from "../../store";
import { capitaliseHeading } from "../../utils";

const DetailsPage = () => {
  const [openPomodoro, setOpenPomodoro] = useState(false);
  const [showDeletePopup, setDeletePopup] = useState(false);
  const [showEditPopup, setEditPopup] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const [task, setTask] = useState<Task | undefined>(undefined);

  // const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { id } = useParams<{ id: string }>();
  // const task: Task | undefined = tasks.find((task) => task.id === id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // console.log(task, "task detail");

  // const task = useLoaderData() as Task;

  useEffect(() => {
    const fetchTask = async () => {
      // if (!id) return;
      try {
        const task = await dispatch(getTaskDetailsThunk(id as string));
        setTask(task.payload as Task);
      } catch (error) {
        console.error("Error fetching task", error);
      }
    };

    fetchTask();
  }, [openPomodoro, id, dispatch]);

  const handleClose = () => {
    setOpenPomodoro(false);
    setEditPopup(false);
  };
  useEffect(() => {}, [openPomodoro]);

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

  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${
        minutes !== 1 ? "s" : ""
      }`;
    } else {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }
  }

  const totalTimeSpent =
    (task &&
      task.pomodoroSessions?.reduce(
        (total, session) => total + session.duration,
        0
      )) ||
    0;
  return (
    <div className="details-page">
      {showNote && !task?.isPomodoroAllowed && (
        <div className="notification">
          NOTE: If you want to gain access for pomodoro for this task, kindly
          edit and allow pomodoro for this task
        </div>
      )}
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

      <div className="task-details">
        <h1>{capitaliseHeading(task?.title as string)}</h1>
        <p>
          <span className="task-detail-value">
            {capitaliseHeading(task?.description as string)}
          </span>
          <br />
          <span className="task-detail-title">Description</span>
        </p>
        <p>
          <span className="task-detail-value">
            {formatDueDate(task?.dueDate as string)}
          </span>
          <br />
          <span className="task-detail-title">Due date</span>
        </p>
        <p>
          <span className="task-detail-value">
            {capitaliseHeading(task?.status as string)}
          </span>
          <br />
          <span className="task-detail-title">Status</span>
        </p>
        <p>
          <span className="task-detail-value">
            {formatTime(totalTimeSpent)}
          </span>
          <br />
          <span className="task-detail-title">Time spent</span>
        </p>
        <p>
          <span className="task-detail-value">
            {capitaliseHeading(task?.category as string)}
          </span>
          <br />
          <span className="task-detail-title">Category</span>
        </p>
        <p>
          <span className="task-detail-value">
            {capitaliseHeading(task?.priority as string)}
          </span>
          <br />
          <span className="task-detail-title">Priority</span>
        </p>
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
