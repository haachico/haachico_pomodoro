import { redirect } from "react-router";
import { auth } from "../firebaseConfig";
import { fetchTasksThunk } from "../redux/tasks/tasksSlice";
import { getStoreDispatch } from "../utils/getStoreDispatch";
import { onAuthStateChanged } from "firebase/auth";

const waitForAuth = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Auth timed out"));
    }, 2000);

    if (auth.currentUser) {
      resolve();
      clearTimeout(timeout);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve();
          unsubscribe();
          clearTimeout(timeout);
        }
      });
    }
  });
};

const viewAllTasksLoader = async () => {
  try {
    await waitForAuth();
  } catch (error) {
    console.error(error);
    return { redirect: "/login" };
  }

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
