// import { useDrop } from "react-dnd";
// import { editTaskThunk } from "../../redux/tasks/tasksSlice";
import { Task } from "../../types";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store";
import "./index.css";
// import DashboardCard from "../DashboardCard";
import DragNDropContainer from "../DragNDropContainer";
import { useState } from "react";

type DragNDropProps = {
  tasks: Task[];
};

const DragNDrop: React.FC<DragNDropProps> = ({ tasks }) => {
  // const dispatch = useDispatch<AppDispatch>();

  const [isDragging, setIsDragging] = useState(false);

  const handledDragging = (dragging: boolean) => setIsDragging(dragging);

  const statuses: ("Pending" | "In Progress" | "Completed")[] = [
    "Pending",
    "In Progress",
    "Completed",
  ];

  return (
    <div className="drag-n-drop-container">
      <p className="drag-drop-info">
        You can drag and drop the cards to change their status.
      </p>
      <div className="drag-n-drop">
        {statuses.map((status) => {
          return (
            <DragNDropContainer
              status={status}
              key={status}
              tasksList={tasks}
              isDragging={isDragging}
              handleDragging={handledDragging}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DragNDrop;
