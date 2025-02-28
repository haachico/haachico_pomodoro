import { onAuthStateChanged } from "firebase/auth";
import { getTaskDetailsThunk } from "../redux/tasks/tasksSlice";
import { getStoreDispatch } from "../utils/getStoreDispatch";
import { auth } from "../firebaseConfig";

const waitForAuth = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Auth timed out"));
    }, 5000);

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

const viewTaskDetailsLoader = async ({ params }: any) => {
  try {
    await waitForAuth();
  } catch (error) {
    console.error(error);
    return { redirect: "/login" };
  }
  const dispatch = getStoreDispatch();
  const { id } = params;
  const result = await dispatch(getTaskDetailsThunk(id));

  console.log(result, "result");
  return result.payload;
};

export default viewTaskDetailsLoader;
