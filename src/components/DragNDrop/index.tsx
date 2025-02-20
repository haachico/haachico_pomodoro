import { useDrop } from "react-dnd";
import { editTaskThunk } from "../../redux/tasks/tasksSlice";
import { CreateTaskType, Task } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import "./index.css";
import DashboardCard from "../DashboardCard";

type DragNDropProps = {
  tasks: Task[];
  type: string
};

const DragNDrop: React.FC<DragNDropProps> = ({ tasks, type }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [{ isOver: isOverAdded }, dropAdded] = useDrop(
    () => ({
      accept: "TASK",
      drop: (task: Task) =>
        dispatch(
          editTaskThunk({
            ...task,
            status: "pending",
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
            status: "in progress",
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
            status: "completed",
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
          className="dropzone"
          style={{ backgroundColor: isOverAdded ? "lightgreen" : "white" }}
          >
          <h2>Pending</h2>
          <div>
            {tasks
              .filter((task) => task.status === "pending")
              .map((task) => (
                <DashboardCard task={task} key={task.id} type="dragDrop"/>
              ))}
          </div>
        </div>
        <div
          ref={dropStarted}
          style={{ backgroundColor: isOverStarted ? "lightblue" : "white" }}
          className="dropzone"
          >
          <h2> In Progress</h2>
          <div>
            {tasks
            .filter((task) => task.status === "in progress")
            .map((task) => (
                <DashboardCard task={task} key={task.id} type="dragDrop" />
              ))}
          </div>
        </div>
        <div
          ref={dropCompleted}
          style={{ backgroundColor: isOverCompleted ? "lightcoral" : "white" }}
            className="dropzone"
          >
          <h2>Completed</h2>
          <div>
            {tasks
              .filter((task) => task.status === "completed")
              .map((task) => (
                <DashboardCard task={task} key={task.id} type="dragDrop" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragNDrop;
