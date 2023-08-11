import { appsApi } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMoviesData = createAsyncThunk(
  "movies/fetchWatchLaterMovieData",
  async (type) => {
    const body = {
      accountType: "Adult",
      type: type, // Use the provided type parameter in the request body
    };
    const response = await appsApi.post(
      "video/getWatchLatterOrLikeVideos",
      body,
    );
    console.log("get watch later", response);

    const videoDataArray = response?.data?.results.map((item) => ({
      videoId: item._id,
      videoData: item.videoData,
    }));
    console.log("video data array", videoDataArray);

    return videoDataArray;
  },
);

const movieLaterSlice = createSlice({
  name: "movieLater",
  initialState: {
    watchLater: [],
    likedMovies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg === "watchLatter") {
          state.watchLater = action.payload;
        } else if (action.meta.arg === "like") {
          state.likedMovies = action.payload;
        }
      })
      .addCase(fetchMoviesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { reducer: movieLaterReducer } = movieLaterSlice;
export default movieLaterSlice.reducer;
