import { fetchMoviesData } from "@/store/slices/movieSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useMoviesData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesData());
  }, [dispatch]);

  const { movies } = useSelector((state) => ({
    movies: state.movieData.movies,
  }));

  return movies;
};

export default useMoviesData;
