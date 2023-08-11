// import { useEffect, useState } from "react";
// import { fetchMoviesData } from "@/store/slices/movieSlice";
// import { useDispatch, useSelector } from "react-redux";

// const searchMovies = (movies, searchQuery) => {
//   if (!movies || !searchQuery) {
//     return movies;
//   }

//   const query = searchQuery.toLowerCase().trim();
//   const matchedMovies = [];
//   const matchedMovieTitles = new Set();

//   movies.forEach((category) => {
//     const { data } = category;
//     for (let i = 0; i < data.length; i++) {
//       const movie = data[i];
//       if (
//         movie.title.toLowerCase().includes(query) &&
//         !matchedMovieTitles.has(movie.title)
//       ) {
//         matchedMovies.push(movie);
//         matchedMovieTitles.add(movie.title);
//         break;
//       }
//     }
//   });

//   return matchedMovies;
// };

// const useMovieSearch = () => {
//   const dispatch = useDispatch();
//   const { movies } = useSelector((state) => state.movieData);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     dispatch(fetchMoviesData());
//   }, [dispatch]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query.trim() === "") {
//       setSearchResults([]); // Set search results to an empty array when query is empty
//     } else {
//       const results = searchMovies(movies, query);
//       setSearchResults(results);
//     }
//   };

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setSearchResults([]); // Set search results to an empty array when search query is cleared
//     }
//   }, [searchQuery]);
//   console.log("search results:", searchResults);

//   return { searchQuery, searchResults, handleSearch };
// };

// export default useMovieSearch;

// useMovieSearch.js

/*=============================================
=               2nd method                      =
=============================================*/

// import { useEffect, useState } from "react";
// import { fetchMoviesData } from "@/store/slices/movieSlice";
// import { useDispatch, useSelector } from "react-redux";

// const searchMovies = (movies, searchQuery) => {
//   if (!movies || !searchQuery) {
//     return movies;
//   }

//   const query = searchQuery.toLowerCase().trim();
//   const matchedMovies = [];
//   const matchedMovieTitles = new Set();

//   movies.forEach((category) => {
//     const { data } = category;
//     if (data) {
//       for (let i = 0; i < data.length; i++) {
//         const movie = data[i];
//         if (
//           movie.title &&
//           movie.title.toLowerCase().includes(query) &&
//           !matchedMovieTitles.has(movie.title)
//         ) {
//           matchedMovies.push(movie);
//           matchedMovieTitles.add(movie.title);
//           break;
//         }
//       }
//     }
//   });

//   return matchedMovies;
// };

// const useMovieSearch = () => {
//   const dispatch = useDispatch();
//   const { movies } = useSelector((state) => state.movieData);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [relatedMovies, setRelatedMovies] = useState([]);

//   useEffect(() => {
//     dispatch(fetchMoviesData());
//   }, [dispatch]);
//   console.log(movies, "from redux");
//   useEffect(() => {
//     if (movies && movies.length > 0) {
//       const results = searchMovies(movies, searchQuery);
//       setSearchResults(results);
//       setRelatedMovies(getRelatedMovies(results));
//     } else {
//       setSearchResults([]);
//       setRelatedMovies([]);
//     }
//   }, [movies, searchQuery]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query.trim() === "") {
//       setSearchResults([]);
//       setRelatedMovies([]);
//     } else {
//       const results = searchMovies(movies, query);
//       setSearchResults(results);
//       setRelatedMovies(getRelatedMovies(results));
//     }
//   };

//   const getRelatedMovies = (movies) => {
//     if (!movies || movies.length === 0) {
//       console.log("Error: Movie array is empty");
//       return [];
//     }
//     console.log(movies, "movies");
//     const searchMovieCategoryIds = movies
//       .flatMap((movie) => movie.categories)
//       .filter((categoryId) => categoryId);
//     console.log(searchMovieCategoryIds, "search movie By Ids");
//     const relatedMovies = [];

//     movies.forEach((movie) => {
//       const { data } = movie;
//       console.log("datasss", data);
//       if (data && data.length > 0) {
//         data.forEach((relatedMovie) => {
//           if (
//             relatedMovie.categories?.some((categoryId) =>
//               searchMovieCategoryIds.includes(categoryId),
//             )
//           ) {
//             relatedMovies.push(relatedMovie);
//           }
//         });
//       }
//     });

//     return relatedMovies;
//   };

//   //   console.log("related Movies:", relatedMovies);
//   return { searchQuery, searchResults, relatedMovies, handleSearch };
// };

// export default useMovieSearch;

/*=============================================
=                3rd Method                   =
=============================================*/

import { useEffect, useState } from "react";
import { fetchMoviesData } from "@/store/slices/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const searchMovies = (movies, searchQuery) => {
  if (!movies || !searchQuery) {
    return movies;
  }

  const query = searchQuery.toLowerCase().trim();
  const matchedMovies = [];
  const matchedMovieTitles = new Set();

  movies.forEach((category) => {
    const { data } = category;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const movie = data[i];
        if (
          movie.title &&
          movie.title.toLowerCase().includes(query) &&
          !matchedMovieTitles.has(movie.title)
        ) {
          matchedMovies.push(movie);
          matchedMovieTitles.add(movie.title);
          break;
        }
      }
    }
  });

  return matchedMovies;
};

const useMovieSearch = (intialQuery = "") => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movieData);
  const [searchQuery, setSearchQuery] = useState(intialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    dispatch(fetchMoviesData());
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const results = searchMovies(movies, searchQuery);
      setSearchResults(results);
      setRelatedMovies(getRelatedMovies(results, movies));
    } else {
      setSearchResults([]);
      setRelatedMovies([]);
    }
  }, [movies, searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setRelatedMovies([]);
    } else {
      const results = searchMovies(movies, searchQuery);
      setSearchResults(results);
      setRelatedMovies(getRelatedMovies(results, movies));
    }
  }, [searchQuery, movies]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getRelatedMovies = (searchResults, movies) => {
    if (!searchResults || searchResults.length === 0) {
      console.log("Error: Search results array is empty");
      return [];
    }

    const searchMovieCategoryIds = searchResults
      .flatMap((movie) => movie.categories)
      .filter((categoryId) => categoryId);

    const relatedMovies = [];

    const relatedMovieIds = new Set(); // Keep track of movie IDs to avoid duplicates

    movies.forEach((category) => {
      const { data } = category;
      if (data && data.length > 0) {
        data.forEach((relatedMovie) => {
          if (
            relatedMovie.categories?.some((categoryId) =>
              searchMovieCategoryIds.includes(categoryId),
            ) &&
            !relatedMovieIds.has(relatedMovie.id) // Check if movie ID is already added
          ) {
            relatedMovies.push(relatedMovie);
            relatedMovieIds.add(relatedMovie.id); // Add movie ID to the set
          }
        });
      }
    });

    return relatedMovies;
  };

  return { searchQuery, searchResults, relatedMovies, handleSearch };
};

export default useMovieSearch;
