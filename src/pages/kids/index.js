import React from "react";
import Navbar from "@/components/Navbar";
import useMoviesData from "@/hooks/movieData";
import Head from "next/head";
import SortSection from "@/components/SortSection";
import dynamic from "next/dynamic";
const images = [
  "https://i0.wp.com/www.newsbugz.com/wp-content/uploads/2021/11/Ayodhi-Movie-1.jpg?w=1280&ssl=1",
  "https://telecomtalk.info/wp-content/uploads/2023/02/action-comedy-movies-on-netflix-this-weekend.jpg",
  "https://www.tamilanjobs.com/wp-content/uploads/2023/03/selfiee-movie-review-2.jpg",
  "https://i0.wp.com/www.newsbugz.com/wp-content/uploads/2021/11/Ayodhi-Movie-1.jpg?w=1280&ssl=1",
  "https://telecomtalk.info/wp-content/uploads/2023/02/action-comedy-movies-on-netflix-this-weekend.jpg",
  "https://www.tamilanjobs.com/wp-content/uploads/2023/03/selfiee-movie-review-2.jpg",
];
const CommonHorizontalList = dynamic(
  () => import("../../components/CommonHorizontalList"),
  { ssr: false },
);
const Caraousel = dynamic(() => import("../../components/Caraousel"), {
  ssr: false,
});

const index = () => {
  const movies = useMoviesData();
  console.log(movies);
  return (
    <>
      <Head>
        <title>Kids</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black">
        <Navbar type="home" />
        <div className="gallery relative z-[1]">
          <Caraousel movieList={images} />
        </div>
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
        <div className="sort-section">
          <CommonHorizontalList type={"genreButtonList"} />
        </div>
        <div className="movie-favorites">
          {movies[1]?.data && movies[1]?.data.length ? (
            <CommonHorizontalList
              type="movieList"
              title="Sci-Fi"
              data={movies[2]?.data}
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
              data={movies[4]?.data}
            />
          ) : (
            <h1>loading</h1>
          )}
        </div>
      </main>
    </>
  );
};

export default index;
