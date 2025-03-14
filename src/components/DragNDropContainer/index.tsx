import { useDispatch } from "react-redux";
import { Task } from "../../types";
import "./index.css";
import { AppDispatch } from "../../store";
import { editTaskThunk } from "../../redux/tasks/tasksSlice";

type DragNDropContainerTypes = {
  status: "Pending" | "In Progress" | "Completed";
  tasksList: Task[];
  isDragging: boolean;
  handleDragging: (dragging: boolean) => void;
};

const DragNDropContainer: React.FC<DragNDropContainerTypes> = ({
  status,
  tasksList,
  isDragging,
  handleDragging,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log(tasksList);

  const handleDragStart = (e: React.DragEvent<HTMLElement>, id: string) => {
    e.dataTransfer.setData("text", `${id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => {
    handleDragging(false);
  };

  const updateTasksList = (id: string, status: string) => {
    const taskToBeUpdated = tasksList.find((task) => task.id === id);

    if (!taskToBeUpdated) {
      return;
    }
    const updatedTask = {
      ...taskToBeUpdated,
      status: status.toLowerCase(),
    };

    dispatch(editTaskThunk(updatedTask));
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>, status: string) => {
    e.preventDefault();

    updateTasksList(e.dataTransfer.getData("text"), status);
    handleDragging(false);
  };
  return (
    <div
      className={`container-dnd ${isDragging && "dragging"}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, status)}
    >
      <h4>{status}</h4>
      <div>
        {tasksList.map((task) => {
          return (
            task.status === status.toLowerCase() && (
              <div
                className={`card ${isDragging && "dragging"}`}
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
              >
                <p>{task.description}</p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default DragNDropContainer;
