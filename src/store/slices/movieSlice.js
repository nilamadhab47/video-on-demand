import { appsApi } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMoviesData = createAsyncThunk("fetchMovieData", async () => {
  const accountType = "Adult";
  const response = await appsApi(
    `video/get-home-section-videos/${accountType}`,
  );
  console.log(response);
  return response.data.results;
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    loading: false,
    movies: [],
    error: null,
  },
  extraReducers: {
    [fetchMoviesData.pending]: (state) => {
      state.loading = true;
    },
    [fetchMoviesData.fulfilled]: (state, action) => {
      state.loading = false;
      state.movies = action.payload;
    },
    [fetchMoviesData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default movieSlice.reducer;
