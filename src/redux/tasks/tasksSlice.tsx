import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTaskType, Task } from "../../types";
// import tasks from "../../db/tasksData";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const initialState: {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
} = {
  tasks: [],
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const tasksCollection = collection(db, "tasks");
    const tasksSnapshot = await getDocs(tasksCollection);
    const tasksList = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dueDate: doc.data().dueDate.toDate().toISOString(),
    })) as Task[];
    return tasksList;
  }
);

export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (task: CreateTaskType) => {
    const taskCollection = collection(db, "tasks");
    const docRef = await addDoc(taskCollection, {
      ...task,
      dueDate: Timestamp.fromDate(new Date(task.dueDate as string)), // Convert ISO string to Timestamp
    });
    return { ...task, id: docRef.id };
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tassks/deleteTask",
  async (id: string) => {
    const taskCollection = collection(db, "tasks");
    await deleteDoc(doc(taskCollection, id));
    return id;
  }
);

export const editTaskThunk = createAsyncThunk(
  "tasks/editTask",
  async (task: Task) => {
    const taskCollection = collection(db, "tasks");
    const docRef = doc(taskCollection, task.id);
    await updateDoc(docRef, {
      ...task,
      dueDate: Timestamp.fromDate(new Date(task.dueDate as string)), // Convert ISO string to Timestamp
    });
    return task;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // add(state, action: PayloadAction<Task>) {
    //   state.tasks.push(action.payload);
    // },
    // remove(state, action: PayloadAction<string>) {
    //   state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    // },
    // edit: {
    //   prepare(id: string, editedText: Partial<Task>) {
    //     return {
    //       payload: { id, ...editedText },
    //     };
    //   },
    //   reducer(state, action: PayloadAction<Task>) {
    //     state.tasks = state.tasks.map((item) => {
    //       if (item.id === action.payload.id) {
    //         return {
    //           ...item,
    //           ...action.payload,
    //         };
    //       } else {
    //         return item;
    //       }
    //     });
    //   },
    // },
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasksThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasksThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasksThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch tasks!";
    });
    builder.addCase(addTaskThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTaskThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.tasks.push(action.payload);
    });
    builder.addCase(addTaskThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add task!";
    });
    builder.addCase(deleteTaskThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });
    builder.addCase(deleteTaskThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete task!";
    });
    builder.addCase(editTaskThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editTaskThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            ...action.payload,
          };
        } else {
          return task;
        }
      });
    });
    builder.addCase(editTaskThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to edit task!";
    });
  },
});

export const { add, remove, edit, setLoggedIn } = tasksSlice.actions;

export default tasksSlice.reducer;
