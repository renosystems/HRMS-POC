import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle" /* idle | loading | completed | failed */,
  employees: null,
  managers: null,
  excutives: null,
  ceo: null,
  error: null,
};

export const getEmployees = createAsyncThunk("employees/get", async () => {
  //replace with api call
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );

  const employees = localStorage.getItem("employees");

  if (employees) {
    return JSON.parse(employees);
  } else {
    const initialEmployees = {
      employees: [],
      managers: [],
      excutives: [],
      ceo: null,
    };
    localStorage.setItem("employees", JSON.stringify(initialEmployees));
    return initialEmployees;
  }
});

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (data) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );

    return data;
  }
);

export const addCeo = createAsyncThunk("employees/addCeo", async (data) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );

  const oldEmployees = JSON.parse(localStorage.getItem("employees"));
  const newEmployees = { ...oldEmployees, ceo: data };
  localStorage.setItem("employees", JSON.stringify(newEmployees));

  return data;
});

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.status = "completed";
        state.employees = action.payload.employees;
        state.managers = action.payload.managers;
        state.excutives = action.payload.excutives;
        state.ceo = action.payload.ceo;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = "completed";

        const newEmployee = action.payload;

        const newEmployees = {
          employees: [...state.employees, newEmployee],
          managers:
            newEmployee.role === "manager"
              ? [...state.managers, newEmployee]
              : [...state.managers],
          excutives:
            newEmployee.role === "excutive"
              ? [...state.excutives, newEmployee]
              : [...state.excutives],
          ceo: state.ceo,
        };

        localStorage.setItem("employees", JSON.stringify(newEmployees));

        state.employees = newEmployees.employees;
        state.managers = newEmployees.managers;
        state.excutives = newEmployees.excutives;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addCeo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCeo.fulfilled, (state, action) => {
        state.status = "completed";
        state.ceo = action.payload;
      })
      .addCase(addCeo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default employeesSlice.reducer;
