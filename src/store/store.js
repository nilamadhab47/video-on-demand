import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";
import movieSlice from "./slices/movieSlice";
import { movieLaterReducer, movieReducer } from "./slices/watchLaterSlice";

// config the store
const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      profileData: profileSlice,
      movieData: movieSlice,
      movieLater: movieLaterReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
