import { onAuthStateChanged } from "firebase/auth";
import { getTaskDetailsThunk } from "../redux/tasks/tasksSlice";
import { getStoreDispatch } from "../utils/getStoreDispatch";
import { auth } from "../firebaseConfig";

const waitForAuth = (): Promise<void> => {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve();
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve();
          unsubscribe();
        }
      });
    }
  });
};

const viewTaskDetailsLoader = async ({ params }: any) => {
  await waitForAuth();
  const dispatch = getStoreDispatch();
  const { id } = params;
  const result = await dispatch(getTaskDetailsThunk(id));

  console.log(result, "result");
  return result.payload;
};

export default viewTaskDetailsLoader;
