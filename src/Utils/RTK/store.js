import { configureStore } from "@reduxjs/toolkit";
import { departmentApiSlice } from "./slices/departmentApi.slice";
import authSlice from "./slices/auth.slice";
import configSlice from "./slices/config.slice";
import accountSettingsSlice from "./slices/accountSettings.slice";
import employeesSlice from "./slices/employees.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    config: configSlice,
    accountSettings: accountSettingsSlice,
    employees: employeesSlice,

    [departmentApiSlice.reducerPath]: departmentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(departmentApiSlice.middleware),
});
