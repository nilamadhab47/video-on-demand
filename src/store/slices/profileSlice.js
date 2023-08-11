import { appsApi } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProfileData = createAsyncThunk("profile", async () => {
  const response = await appsApi("users/profiles");
  return response.data.profiles;
});

const profileSlice = createSlice({
  name: "profileData",
  initialState: {
    loading: false,
    user: [],
    error: null,
  },
  extraReducers: {
    [fetchProfileData.pending]: (state) => {
      state.loading = true;
    },
    [fetchProfileData.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [fetchProfileData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default profileSlice.reducer;
