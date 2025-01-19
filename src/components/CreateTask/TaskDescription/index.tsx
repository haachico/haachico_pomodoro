import { Task } from "../../../types";
import "./index.css";

type TaskDescriptionProps = {
  payload: Task;
  setPayload: React.Dispatch<React.SetStateAction<Task>>;
};

const TaskDescription: React.FC<TaskDescriptionProps> = ({
  payload,
  setPayload,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPayload((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="description-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          value={payload.title}
          id="title"
          placeholder="Title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          value={payload.description}
          id="description"
          placeholder="Description"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TaskDescription;
