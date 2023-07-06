import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle" /* idle | loading | completed | failed */,
  config: null,
  error: null,
};

export const getConfiguration = createAsyncThunk("config/get", async () => {
  //replace with api call
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );

  const config = localStorage.getItem("config");

  if (config) {
    return JSON.parse(config);
  } else {
    const initialConfig = {
      completed: false,
      steps: {
        step1: { id: "step1", completed: false, last: false },
        step2: { id: "step2", completed: false, last: false },
        step3: { id: "step3", completed: false, last: false },
        step4: { id: "step4", completed: false, last: false },
        step5: { id: "step5", completed: false, last: false },
        step6: { id: "step5", completed: false, last: true },
      },
    };
    localStorage.setItem("config", JSON.stringify(initialConfig));
    return initialConfig;
  }
});

export const updateConfiguration = createAsyncThunk(
  "config/update",
  async (stepId) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );

    const config = JSON.parse(localStorage.getItem("config"));

    config[stepId].completed = true;

    if (config[stepId].last) config.completed = true;

    return { ...config };
  }
);

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getConfiguration.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConfiguration.fulfilled, (state, action) => {
        state.status = "completed";
        state.config = action.payload;
      })
      .addCase(getConfiguration.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateConfiguration.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateConfiguration.fulfilled, (state, action) => {
        state.status = "completed";
        state.config = action.payload;
      })
      .addCase(updateConfiguration.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
// export const {  } = configSlice.actions;

export default configSlice.reducer;