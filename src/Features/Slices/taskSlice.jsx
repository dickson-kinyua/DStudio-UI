import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk("tasks/fetchTodo", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/fetchPosts`, {
      credentials: "include",
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch tasks");
    }

    // ✅ Check if the response contains valid tasks
    if (!Array.isArray(data)) {
      console.warn("No tasks found or user not logged in.");
      return rejectWithValue("User not logged in or no tasks available");
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteAllTasks: (state) => {
      state.tasks = [];
    },
    logout: (state) => {
      state.tasks = []; // ✅ Clear tasks on logout
      state.loading = false;
      state.error = null;
    },
    updateTasks: (state, action) => {
      const task = state.tasks.find((task) => task._id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },

  extraReducers: (builder) => {
  builder
    .addCase(fetchTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTodo.fulfilled, (state, action) => {
      state.loading = false;
      
      if (typeof action.payload === "string") {
        // If the payload is an error message (from rejectWithValue), do nothing
        console.log(action.payload);
        return;
      }

      state.tasks = action.payload;
    })
    .addCase(fetchTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Store error message
      state.tasks = []; // Clear tasks when the user is not logged in
    });
}
});

export const { deleteAllTasks, updateTasks } = taskSlice.actions;
export default taskSlice.reducer;
