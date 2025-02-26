import { auth } from "../firebaseConfig";
import { fetchTasksThunk } from "../redux/tasks/tasksSlice";
import { getStoreDispatch } from "../utils/getStoreDispatch";
import { onAuthStateChanged } from "firebase/auth";

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

const viewAllTasksLoader = async () => {
  await waitForAuth();

  const dispatch = getStoreDispatch();
  try {
    const result = await dispatch(fetchTasksThunk()).unwrap();
    return result || [];
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    return [];
  }
};

export default viewAllTasksLoader;
