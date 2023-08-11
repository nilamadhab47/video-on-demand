import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import CommonHorizontalList from "@/components/CommonHorizontalList";
import Navbar from "@/components/Navbar";
import SortSection from "@/components/SortSection";
import useMoviesData from "@/hooks/movieData";
import { useRouter } from "next/router";
import Card from "@/components/Card";
import useMovieSearch from "@/hooks/useMovieSearch";

export default function Browse({ children }) {
  const router = useRouter();
  const movies = useMoviesData();
  console.log("data in browse page from useMovideData hook", movies);
  const [selectedCategory, setSelectedCategory] = useState();
  // const [searchQuery, setSearchQuery] = useState("");
  const { searchQuery, searchResults, relatedMovies, handleSearch } =
    useMovieSearch();

  const handleCategoryClick = (category) => () => {
    router.push(`/category/${category}`);
  };
  // const filteredMovies = selectedCategory
  // ? movies.find((category) => category.title === selectedCategory)?.data || []
  //   : [];
  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  //   searchMovies(query);
  // };
  console.log("related movies in browser", relatedMovies);
  console.log("searchResults movies in browser", searchResults);
  // console.log("searchQuery movies in browser", searchQuery);
  console.log("handleSearch movies in browser", handleSearch);
  return (
    <>
      <Head>
        <title>Browse</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-darkBg">
        <Navbar onSearch={handleSearch} />
        <SortSection showPreference showSortBy />
        <div
          className={`flex overflow-x-scroll pb-10 hide-scroll-bar ${
            searchQuery ? "hidden" : "" // Hide the movies grid when there is a search query
          }`}
          style={{}}>
          <div className="flex lg:ml-20 md:ml-10 ml-4 gap-8">
            {movies && movies.length ? (
              movies.map((category, index) => (
                <div
                  onClick={handleCategoryClick(category.title)}
                  key={index}
                  className="relative inline-block w-[220px] sm:w-[280px] aspect-[280/200] overflow-hidden rounded-sm shadow-md bg-btnLight hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
                  <Image fill src="/images/actionGenre.svg" alt="genre Image" />
                  <div className="z-10 bg-black opacity-60 relative w-full h-full flex justify-center items-center">
                    <p className="font20-30 font-poppins font-medium text-white opacity-100">
                      {category.title}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>loading..</h1>
            )}
          </div>
        </div>

        {!searchQuery ? (
          <>
            <div className="movie-trending lg:mt-0">
              {movies[1]?.data && movies[1]?.data.length ? (
                <CommonHorizontalList
                  type="movieList"
                  title="Action"
                  data={movies[0]?.data}
                />
              ) : (
                <h1>loading</h1>
              )}
            </div>
            <div className="movie-favorites">
              {movies[1]?.data && movies[1]?.data.length ? (
                <CommonHorizontalList
                  type="movieList"
                  title="comedy"
                  data={movies[3]?.data}
                />
              ) : (
                <h1>loading</h1>
              )}
            </div>
            <div className="movie-kids">
              {movies[1]?.data && movies[1]?.data.length ? (
                <CommonHorizontalList
                  type="movieList"
                  title="Adventure"
                  data={movies[1]?.data}
                />
              ) : (
                <h1>loading</h1>
              )}
            </div>
          </>
        ) : (
          // Show search results when there is a search query
          <div className="search-results ml-20">
            <h2 className="mb-4 text-white font-poppins text-xl">
              Search Results
            </h2>
            {searchResults.length ? (
              searchResults.map((movie) => (
                <div key={movie.id} className="search-result-item">
                  <Card
                    image={movie.poster_path_full_path}
                    title={movie.title}
                    time={movie.runtime}
                  />
                </div>
              ))
            ) : (
              <h1>No results found.</h1>
            )}
          </div>
        )}
        {relatedMovies.length > 0 && (
          <div className="related-movies ml-20 mt-8">
            <h2 className="mb-4 text-white font-poppins text-xl flex gap-4 items-center">
              Related Movies{" "}
              <Image
                src="/images/coolicon.png"
                alt="arrow"
                height={13}
                width={24}
                // className="text-white w-7 sm:w-8 h-4 sm:h-6"
              />
            </h2>
            <div className="related-movies-list flex flex-wrap items-center gap-12">
              {/* Render related movies */}
              {relatedMovies.map((movie) => (
                <div key={movie.id} className="related-movie-item">
                  <Card
                    image={movie?.poster_path_full_path}
                    title={movie?.title}
                    time={movie?.runtime}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
