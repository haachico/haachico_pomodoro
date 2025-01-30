import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types";
import tasks from "../../db/tasksData";

const initialState: {
  tasks: Task[];
} = {
  tasks: [...tasks],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    remove(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
    edit: {
      prepare(id: string, editedText: Partial<Task>) {
        return {
          payload: { id, ...editedText },
        };
      },
      reducer(state, action: PayloadAction<Task>) {
        state.tasks = state.tasks.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              ...action.payload,
            };
          } else {
            return item;
          }
        });
      },
    },
    // mark(state, action) {
    //   state.tasks = state.tasks.map((task) =>
    //     task.id === action.payload
    //       ? { ...task, isComplete: !task.isComplete }
    //       : task
    //   );
    // },
    // clearAllCompleted(state, action) {
    //   state.tasks = state.tasks.filter((todo) => todo.isComplete === false);
    // },
  },
});

export const { add, remove, edit } = tasksSlice.actions;

export default tasksSlice.reducer;
