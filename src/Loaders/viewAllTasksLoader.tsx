import { fetchTasksThunk } from "../redux/tasks/tasksSlice";
import { getStoreDispatch } from "../utils/getStoreDispatch";

const viewAllTasksLoader = async () => {
  const dispatch = getStoreDispatch();
  const result = await dispatch(fetchTasksThunk());
  return result.payload;
};

export default viewAllTasksLoader;
