import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle" /* idle | loading | completed | failed */,
  settings: null,
  error: null,
};

export const getAccountSettings = createAsyncThunk(
  "accountSettings/get",
  async () => {
    //replace with api call
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );

    const accountSettings = localStorage.getItem("accountSettings");

    if (accountSettings) {
      return JSON.parse(accountSettings);
    } else {
      const initialaccountSettings = {
        rwf: "jobPostingSystem",
        hasApprovalCycle: true,
        approvalCycle: "both",
        applicantForm: "basic",
        ceo: {},
      };
      localStorage.setItem(
        "accountSettings",
        JSON.stringify(initialaccountSettings)
      );
      return initialaccountSettings;
    }
  }
);

export const updateAccountSettings = createAsyncThunk(
  "accountSettings/update",
  async (data) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );
    localStorage.setItem("accountSettings", JSON.stringify(data));
    return data;
  }
);

const accountSettingsSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getAccountSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAccountSettings.fulfilled, (state, action) => {
        state.status = "completed";
        state.settings = action.payload;
      })
      .addCase(getAccountSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateAccountSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAccountSettings.fulfilled, (state, action) => {
        state.status = "completed";
        state.settings = action.payload;
      })
      .addCase(updateAccountSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
// export const {  } = accountSettingsSlice.actions;

export default accountSettingsSlice.reducer;
