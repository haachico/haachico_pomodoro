import { fetchTasksThunk } from "../redux/tasks/tasksSlice";
import { getStoreDispatch } from "../utils/getStoreDispatch";

const viewAllTasksLoader = async () => {
  const dispatch = getStoreDispatch();
  const result = await dispatch(fetchTasksThunk());

  console.log(result, "result");
  return result.payload;
};

export default viewAllTasksLoader;
