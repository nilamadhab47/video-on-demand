import Navbar from "@/components/Navbar";
import SortSection from "@/components/SortSection";
import useMoviesData from "@/hooks/movieData";
import useTrendingMovies from "@/hooks/useTrendingMovies";
import useWatchLaterOrLike from "@/hooks/useWatchLaterOrLike";
import { fetchMoviesData, movieReducer } from "@/store/slices/watchLaterSlice";
import { appsApi } from "@/utils/api";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const CommonHorizontalList = dynamic(
  () => import("../../components/CommonHorizontalList"),
  { ssr: false },
);
const index = () => {
  // const dispatch = useDispatch();

  // const [watchLaterList, setWatchLaterList] = useState();
  const movies = useMoviesData();

  // const fetchMovies = () => {
  //   dispatch(fetchMoviesData());
  // };
  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  // const watchLaterLists = useSelector((state) => {
  //   return state.watchLaterList.movies.map((item) => item.videoData);
  // });

  // const watchLaterList = useMemo(() => watchLaterLists, [watchLaterLists]);

  // useEffect(() => {
  //   // Do something with watchLaterList, if needed
  // }, [watchLaterList]);

  // console.log("watch later list", watchLaterList);
  const watchLaterList = useWatchLaterOrLike("watchLatter");
  const newUpcoming = useTrendingMovies();
  console.log("NewUpcoming", newUpcoming);

  return (
    <>
      <Head>
        <title>New and Popular</title>

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
            title="Upcoming Release"
            data={newUpcoming[3]?.videoIds}
          />
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
            type="movieList"
            title="Popular"
            data={newUpcoming[0]?.videoIds}
          />
        </div>
      </main>
    </>
  );
};

export default index;
