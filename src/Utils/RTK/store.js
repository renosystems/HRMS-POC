import { configureStore } from "@reduxjs/toolkit";
import { departmentApiSlice } from "./slices/departmentApi.slice";
import authSlice from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [departmentApiSlice.reducerPath]: departmentApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(departmentApiSlice.middleware),
});
