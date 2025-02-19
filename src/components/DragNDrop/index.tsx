import { useDrop } from "react-dnd";
import { editTaskThunk } from "../../redux/tasks/tasksSlice";
import { CreateTaskType, Task } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import "./index.css";
import DashboardCard from "../DashboardCard";

type DragNDropProps = {
  tasks: Task[];
};

const DragNDrop: React.FC<DragNDropProps> = ({ tasks }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [{ isOver: isOverAdded }, dropAdded] = useDrop(
    () => ({
      accept: "TASK",
      drop: (task: Task) =>
        dispatch(
          editTaskThunk({
            ...task,
            status: "Pending",
          })
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [tasks]
  );

  const [{ isOver: isOverStarted }, dropStarted] = useDrop(
    () => ({
      accept: "TASK",
      drop: (task: Task) =>
        dispatch(
          editTaskThunk({
            ...task,
            status: "In Progress",
          })
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [tasks]
  );

  const [{ isOver: isOverCompleted }, dropCompleted] = useDrop(
    () => ({
      accept: "TASK",
      drop: (task: Task) =>
        dispatch(
          editTaskThunk({
            ...task,
            status: "Completed",
          })
        ),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [tasks]
  );
  return (
    <div className="drag-n-drop-container">
      <div className="drag-n-drop">
        <div
          ref={dropAdded}
          style={{ backgroundColor: isOverAdded ? "lightgreen" : "white" }}
        >
          <h2>Pending</h2>
          <div>
            {tasks
              .filter((task) => task.status === "Pending")
              .map((task) => (
                <DashboardCard task={task} key={task.id} />
              ))}
          </div>
        </div>
        <div
          ref={dropStarted}
          style={{ backgroundColor: isOverStarted ? "lightblue" : "white" }}
        >
          <h2> In Progress</h2>
          <div>
            {tasks
              .filter((task) => task.status === "In Progress")
              .map((task) => (
                <DashboardCard task={task} key={task.id} />
              ))}
          </div>
        </div>
        <div
          ref={dropCompleted}
          style={{ backgroundColor: isOverCompleted ? "lightcoral" : "white" }}
        >
          <h2>Completed</h2>
          <div>
            {tasks
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <DashboardCard task={task} key={task.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragNDrop;
