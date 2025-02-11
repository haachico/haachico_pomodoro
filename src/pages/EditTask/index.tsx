import React from "react";
import CreateTask from "../CreateTask";
import { useLocation } from "react-router";

function EditTask() {
  const location = useLocation();
  const task = location.state.task; // Access the sent state
  const id = location.state.id; // Access the sent state
  return (
    <div>
      <CreateTask mode="edit" task={task} id={id} />
    </div>
  );
}

export default EditTask;
