import React from "react";
import CreateTask from "../CreateTask";
import { useLocation, useParams } from "react-router";
import { Task } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function EditTask() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { id: taskId } = useParams();

  const task: Task | undefined = tasks.find((task) => task.id == taskId);

  console.log({
    taskId,
    task,
  });

  return (
    <div>
      <CreateTask mode="edit" task={task} id={taskId} />
    </div>
  );
}

export default EditTask;
