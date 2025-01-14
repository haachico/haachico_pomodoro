import { useParams } from "react-router-dom";
import tasks from "../../db/tasksData";

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const task = tasks.find((task) => task.id === parseInt(id || "0"));
  return (
    <div>
      <h1> {task?.title}</h1>
      <p>{task?.description}</p>
    </div>
  );
};

export default DetailsPage;
