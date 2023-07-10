import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle" /* idle | loading | completed | failed */,
  departments: null,
  error: null,
};

export const getDepartments = createAsyncThunk("departments/get", async () => {
  //replace with api call
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );

  const departments = localStorage.getItem("departments");

  if (departments) {
    return JSON.parse(departments);
  } else {
    const initialDepartments = [];
    localStorage.setItem("departments", JSON.stringify(initialDepartments));
    return initialDepartments;
  }
});

export const addDepartment = createAsyncThunk(
  "departments/addDepartment",
  async (data) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );

    return data;
  }
);

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getDepartments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.status = "completed";
        state.departments = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.status = "completed";

        const newDepartments = [...state.departments, action.payload];

        localStorage.setItem("employees", JSON.stringify(newDepartments));

        state.departments = newDepartments;
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default departmentsSlice.reducer;
