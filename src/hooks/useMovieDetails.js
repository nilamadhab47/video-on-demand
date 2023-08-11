// import { fetchMoviesData } from "@/store/slices/movieSlice";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useMovieDetails = (movieId) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchMoviesData());
//   }, [dispatch]);

//   const { movies } = useSelector((state) => state.movieData);

//   const movie = movies
//     .flatMap((category) => category.data)
//     .find((movie) => movie.id === movieId);

//   const getMoviesByGenres = (genres) => {
//     if (!movies.length) {
//       return [];
//     }

//     console.log("All Movies:", movies); // Check all movies data

//     const uniqueMovies = new Set();
//     const addedMovies = new Set();

//     movies.forEach((category) => {
//       const filteredMovies = category.data.filter((movie) =>
//         movie.genres.some((genre) => genres.includes(genre.name)),
//       );

//       filteredMovies.forEach((movie) => {
//         if (!addedMovies.has(movie.id)) {
//           uniqueMovies.add(movie);
//           addedMovies.add(movie.id);
//         }
//       });
//     });

//     const relatedMovies = Array.from(uniqueMovies);

//     console.log("Related Movies:", relatedMovies); // Check related movies data

//     return relatedMovies;
//   };

//   const movieGenres = movie?.genres.map((genre) => genre.name) || [];
//   const relatedMovies = getMoviesByGenres(movieGenres);
//   console.log("movie genres", movieGenres);
//   console.log("related movies", relatedMovies);
//   return { movie, relatedMovies };
// };

// export default useMovieDetails;

import { fetchMoviesData } from "@/store/slices/movieSlice";
import { appsApi } from "@/utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useMovieDetails = (movieId) => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchMoviesData());
  }, [dispatch]);

  const { movies } = useSelector((state) => state.movieData);

  const fetchMovieData = async () => {
    console.log("mvid", movieId);
    const movieDataResponse = await appsApi.get(`video/${movieId}`);
    console.log("movie by hook", movieDataResponse);
    setMovie(movieDataResponse.data.video); // Update the movie state with the fetched data
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);

  const getMoviesByGenres = (genres) => {
    if (!movies.length) {
      return { relatedMovies: [], firstGenreMovies: [] };
    }

    const uniqueMovies = new Set();
    const addedMovies = new Set();
    let firstGenreMovies = [];

    movies.forEach((category) => {
      const filteredMovies = category.data.filter((movie) =>
        movie.genres.some((genre) => genres.includes(genre.name)),
      );

      filteredMovies.forEach((movie) => {
        if (!addedMovies.has(movie.id)) {
          uniqueMovies.add(movie);
          addedMovies.add(movie.id);
        }
      });

      if (!firstGenreMovies.length && filteredMovies.length) {
        firstGenreMovies = filteredMovies;
      }
    });

    const relatedMovies = Array.from(uniqueMovies);

    return { relatedMovies, firstGenreMovies };
  };

  const movieGenres = movie?.genres.map((genre) => genre.name) || [];
  const { relatedMovies, firstGenreMovies } = getMoviesByGenres(movieGenres);

  return { movie, relatedMovies, firstGenreMovies };
};

export default useMovieDetails;
