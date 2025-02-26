import { fetchTasksThunk } from "../redux/tasks/tasksSlice";
import { getStoreDispatch } from "../utils/getStoreDispatch";

const viewAllTasksLoader = async () => {
  const dispatch = getStoreDispatch();
  const result = await dispatch(fetchTasksThunk()).unwrap();

  console.log(result, "result");
  if (result) {
    return result;
  } else {
    console.error("Failed to fetch tasks");
    return [];
  }
};

export default viewAllTasksLoader;
