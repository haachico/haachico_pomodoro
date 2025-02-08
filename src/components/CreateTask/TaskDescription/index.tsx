import { CreateTaskType } from "../../../types";
import "./index.css";
import TextField from "@mui/material/TextField";

type TaskDescriptionProps = {
  payload: CreateTaskType;
  setPayload: React.Dispatch<React.SetStateAction<CreateTaskType>>;
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
        <TextField
          name="title"
          value={payload.title}
          id="title"
          placeholder="Title"
          onChange={handleChange}
          label="Title"
          variant="standard"
          fullWidth
        />
      </div>
      <div>
        <TextField
          name="description"
          value={payload.description}
          id="description"
          label="Description"
          placeholder="Description"
          variant="standard"
          onChange={handleChange}
          fullWidth
        />
      </div>
    </div>
  );
};

export default TaskDescription;
