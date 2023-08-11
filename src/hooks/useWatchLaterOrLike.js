import { fetchMoviesData } from "@/store/slices/watchLaterSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useWatchLaterOrLike = (type) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesData(type));
  }, [dispatch, type]);

  const movies = useSelector((state) => {
    if (type === "watchLatter") {
      return state.movieLater.watchLater;
    } else if (type === "like") {
      return state.movieLater.likedMovies;
    }
    return [];
  });

  useEffect(() => {
    // Do something with movies, if needed
  }, [movies]);

  return movies;
};

export default useWatchLaterOrLike;
