import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  selectedTasks: {},
  isLoading: false,
  error: "",
};

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    addTasktoList: (state, action) => {
      const id = Math.random() * 100;
      let newTask = { ...action.payload, id };
      state.tasks.push(newTask);
    },
    deleteTaskList: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskList: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    },
    setSelectedTask: (state, action) => {
      state.selectedTasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksFromServer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.error = "";
      })
      .addCase(getTasksFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.tasks = [];
      })
      .addCase(addTasksToServer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addTasksToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
        state.error = "";
      })
      .addCase(addTasksToServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(updateTasksFromServer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        state.error = "";
      })
      .addCase(updateTasksFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteTasksFromServer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.error = "";
      })
      .addCase(deleteTasksFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});
const BASE_URL = "http://localhost:5000/tasks";

export const getTasksFromServer = createAsyncThunk(
  "tasks/getTasksFromServer",
  async (payload, thunkAPI) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return thunkAPI.rejectWithValue({ error: "No Tasks Found" });
    }
  }
);
export const addTasksToServer = createAsyncThunk(
  "tasks/addTasksToServer",
  async (payload, thunkAPI) => {
    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return thunkAPI.rejectWithValue({ error: " Task not Added" });
    }
  }
);

export const updateTasksFromServer = createAsyncThunk(
  "tasks/updateTasksFromServer",
  async (payload, thunkAPI) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(`${BASE_URL}/${payload.id}`, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return thunkAPI.rejectWithValue({ error: " Task not Updated" });
    }
  }
);

export const deleteTasksFromServer = createAsyncThunk(
  "tasks/deleteTasksFromServer",
  async (payload, thunkAPI) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(`${BASE_URL}/${payload}`, options);
    if (response.ok) {
      return payload;
    } else {
      return thunkAPI.rejectWithValue({ error: " Task not Deleted" });
    }
  }
);

export const {
  addTasktoList,
  deleteTaskList,
  updateTaskList,
  setSelectedTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
