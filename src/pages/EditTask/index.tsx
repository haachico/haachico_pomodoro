import CreateTask from "../CreateTask";
import { Task } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useParams } from "react-router-dom";

function EditTask() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const params = useParams<{ id: string }>();

  const task: Task | undefined = tasks?.find(
    (task: Task) => task.id == params.id
  );

  return (
    <div>
      <CreateTask mode="edit" task={task} id={params.id} />
    </div>
  );
}

export default EditTask;
