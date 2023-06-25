import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  status: "idle" /* idle | loading | completed | failed */,
  authenticated: false /* true | false  */,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (data) => {
  //replace with api call
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );

  return "token123";
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );

  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkCach(state) {
      const cachedAuth = localStorage.getItem("auth");

      if (cachedAuth) {
        const authJSON = JSON.parse(cachedAuth);
        state.token = authJSON.token;
        state.status = "completed";
        state.authenticated = true;
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "completed";
        state.authenticated = true;
        state.token = action.payload;

        localStorage.setItem("auth", JSON.stringify({ token: action.payload }));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.authenticated = false;
        state.token = null;

        localStorage.removeItem("auth");
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { checkCach } = authSlice.actions;

export default authSlice.reducer;
