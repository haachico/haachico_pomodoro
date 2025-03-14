import { useDrop } from "react-dnd";
import { editTaskThunk } from "../../redux/tasks/tasksSlice";
import { Task } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import "./index.css";
import DashboardCard from "../DashboardCard";
import DragNDropContainer from "../DragNDropContainer";
import { useState } from "react";

type DragNDropProps = {
  tasks: Task[];
};

const DragNDrop: React.FC<DragNDropProps> = ({ tasks }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isDragging, setIsDragging] = useState(false);

  const handledDragging = (dragging: boolean) => setIsDragging(dragging);

  const statuses: ("Pending" | "In Progress" | "Completed")[] = [
    "Pending",
    "In Progress",
    "Completed",
  ];

  return (
    <div className="drag-n-drop-container">
      <div className="drag-n-drop">
        {statuses.map((status) => {
          return (
            <DragNDropContainer
              status={status}
              key={status}
              tasksList={tasks}
              isDragging={isDragging}
              handledDragging={handledDragging}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DragNDrop;
