import { getTaskDetailsThunk } from "../redux/tasks/tasksSlice";
import { getStoreDispatch } from "../utils/getStoreDispatch";

const viewTaskDetailsLoader = async ({ params }: any) => {
  const dispatch = getStoreDispatch();
  const result = await dispatch(getTaskDetailsThunk(params.id));
  return result.payload;
};

export default viewTaskDetailsLoader;
