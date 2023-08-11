import Navbar from "@/components/Navbar";
import useMovieSearch from "@/hooks/useMovieSearch";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Card = dynamic(() => import("../../components/Card"), { ssr: false });

const Index = () => {
  const router = useRouter();
  const { query } = router.query;
  const { searchResults, relatedMovies, handleSearch } = useMovieSearch(query);
  console.log("searcheResults", searchResults);
  useEffect(() => {
    handleSearch(query); // Pass the query to handleSearch
  }, [query, handleSearch]);
  return (
    <>
      <main className="bg-darkBg w-full h-screen">
        <Navbar type="home" />
        <div className="search-results ml-20">
          <h2 className="mb-4 text-white font-poppins text-xl">
            Search Results for {`"${query}"`}
          </h2>
          <div className="search-result-item-div flex gap-12 overflow-x-scroll pb-10 hide-scroll-bar">
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
              <h1 className="mb-4 text-white font-poppins text-xl">
                No results found.
              </h1>
            )}
          </div>
        </div>
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
};

export default Index;
