import { getTaskDetailsThunk } from "../redux/tasks/tasksSlice";
import { getStoreDispatch } from "../utils/getStoreDispatch";

const viewTaskDetailsLoader = async ({ params }: any) => {
  const dispatch = getStoreDispatch();
  const { id } = params;
  const result = await dispatch(getTaskDetailsThunk(id));

  console.log(result, "result");
  return result.payload;
};

export default viewTaskDetailsLoader;
