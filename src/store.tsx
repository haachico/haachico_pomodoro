import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./redux/tasks/tasksSlice";

const store = configureStore({
  reducer: {
    todos: tasksReducer,
  },
});

export default store;
