import Navbar from "@/components/Navbar";
import useMoviesData from "@/hooks/movieData";
import useWatchLaterOrLike from "@/hooks/useWatchLaterOrLike";
import {
  fetchMoviesData,
  fetchWatchLatterOrLikeMoviesData,
  removeFromWatchLaterList,
} from "@/store/slices/watchLaterSlice";
import { appsApi } from "@/utils/api";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const CommonHorizontalList = dynamic(
  () => import("../../components/CommonHorizontalList"),
  { ssr: false },
);
const SortSection = dynamic(() => import("../../components/SortSection"), {
  ssr: false,
});

const index = () => {
  const movies = useMoviesData();

  const watchLaterList = useWatchLaterOrLike("watchLatter");
  const LikedMoviesList = useWatchLaterOrLike("like");

  console.log("Watch Later Movies hook:", watchLaterList);
  console.log("Liked Movies hook:", LikedMoviesList);

  return (
    <>
      <Head>
        <title>My List</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black">
        <Navbar type="home" />
        <SortSection showSortBy />
        <div className="movie-trending lg:mt-0">
          <CommonHorizontalList
            type="movieList"
            title="Recently Watched"
            data={movies[0]?.data}
          />
        </div>
        <div className="sort-section">
          <CommonHorizontalList type={"genreButtonList"} />
        </div>
        <div className="movie-favorites">
          <CommonHorizontalList
            type="watchLaterList"
            title="Watch Later"
            data={watchLaterList}
          />
        </div>
        <div className="movie-kids">
          <CommonHorizontalList
            type="watchLaterList"
            title="Liked Movies"
            data={LikedMoviesList}
          />
        </div>
      </main>
    </>
  );
};

export default index;
