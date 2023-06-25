import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api.slice";
import authSlice from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
