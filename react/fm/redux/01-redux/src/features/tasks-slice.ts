import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

type TasksState = {
  entites: Task[];
};

// type DraftTask = Partial<Task> // Partial<T> T의 타입이지만, 모두 옵셔널로 만듬
type DraftTask = RequireOnly<Task, "title">;

const createTask = (draftTask: DraftTask): Task => {
  return { id: nanoid(), ...draftTask };
};

const initialState: TasksState = {
  entites: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const task = createTask(action.payload);
      state.entites.unshift(task);
    },
    removeTask: (state) => state,
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice;
