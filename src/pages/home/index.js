import React, { useState } from "react";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
// import MovieDetails from "@/components/MovieDetails";
import Footer from "@/components/Footer";
import poster from "@/utils/moviePoster.png";
import { appsApi } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesData } from "@/store/slices/movieSlice";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import WaveLoading from "@/components/WaveLoading";
import useTrendingMovies from "@/hooks/useTrendingMovies";

const movieData = [
  {
    Title: "Avatar",
    Year: "2009",
    Rated: "PG-13",
    Released: "18 Dec 2009",
    Runtime: "162 min",
    Genre: "Action, Adventure, Fantasy",
    Director: "James Cameron",
    Writer: "James Cameron",
    Actors:
      "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang, Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
    Plot: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    Language: "English, Spanish",
    Country: "USA, UK",
    Awards: "Won 3 Oscars. Another 80 wins & 121 nominations.",
    Poster:
      "https://cdna.artstation.com/p/assets/images/images/031/645/214/large/shreyas-raut-avatar-2.jpg?1604210989",
    Metascore: "83",
    imdbRating: "7.9",
    imdbVotes: "890,617",
    imdbID: "tt0499549",
    Type: "movie",
    Response: "True",
    Images: [
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
      "https://images-na.ssl-images-amazon.com/images/M/MV5BNzM2MDk3MTcyMV5BMl5BanBnXkFtZTcwNjg0MTUzNA@@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxOTEwNDcxN15BMl5BanBnXkFtZTcwOTg0MTUzNA@@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxMDg1Nzk1MV5BMl5BanBnXkFtZTcwMDk0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    ],
  },
];
const CommonHorizontalList = dynamic(
  () => import("../../components/CommonHorizontalList"),
  { ssr: false },
);
const MovieDetails = dynamic(() => import("../../components/MovieDetails"), {
  ssr: false,
});
const Home = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchMoviesDataFromReducer = async () => {
    dispatch(fetchMoviesData());
  };

  useEffect(() => {
    fetchMoviesDataFromReducer();
  }, []);

  const { movies } = useSelector((state) => {
    const movieData = state.movieData;
    console.log(movieData);

    return {
      movies: movieData.movies,
    };
  });
  const handleCategoryClick = (category) => () => {
    router.push(`/category/${category}`);
  };

  console.log("home movies", movies);
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      // Redirect to signin page if access token is not present
      window.location.href = "/signin";
    }
  }, []);

  // const fetchTrendingMovies = async () => {
  //   const response = await appsApi.get("video/getUpComingTopRatedVideo");
  //   console.log("trending movies", response);
  // };

  // useEffect(() => {
  //   fetchTrendingMovies();
  // }, []);

  const trendingMovies = useTrendingMovies();

  console.log("trending movies hook: ", trendingMovies);

  return (
    <>
      <Head>
        <title>Home</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-darkBg">
        <div className="navbar relative z-[1]">
          <Navbar type="home" />
        </div>

        <div className="movie-poster md:mt-[-7rem] mt-[-4rem] z-0 relative text-white lg:h-[911px] md:h-[647px] h-[189px]">
          <Image
            src={movies[0]?.data[0].backdrop_path_full_path}
            // height={911}
            // width="fill"
            fill
            alt="poster"
          />

          <div className="movieDetails lg:pr-[28rem] relative lg:top-[28rem] flex-col items-center md:flex pt-20 md:pt-0 lg:pt-0 lg:ml-4 hidden ">
            <MovieDetails
              title={movies[0]?.data[0].title}
              year={movies[0]?.data[0].release_date.substr(0, 4)}
              runtime={movies[0]?.data[0]?.runtime}
              rated={"PG-13"}
              imdbRating={movies[0]?.data[0].vote_average}
              plot={movies[0]?.data[0].overview}
              movieId={movies[0]?.data[0].id}
              movieDetStyle="lg:mt-[-6rem] md:mt-[18rem]"
              isWatchLater={movies[0]?.data[0].isWatchLatter}
            />
          </div>

          <div className="movieDetails lg:pr-[28rem] relative lg:top-[28rem] flex flex-col items-center  pt-20 lg:pt-0 lg:ml-4 md:hidden">
            <MovieDetails
              type="mobile"
              title={movies[0]?.data[0].title}
              year={movies[0]?.data[0].release_date.substr(0, 4)}
              runtime={movies[0]?.data[0]?.runtime}
              rated={"PG-13"}
              imdbRating={movies[0]?.data[0].vote_average}
              plot={movies[0]?.data[0].overview}
            />
          </div>
        </div>

        <div className="continue-watching relative lg:top-[-11rem]">
          <CommonHorizontalList
            type="movieList"
            title="Continue Watching"
            data={movies[0]?.data}
          />
        </div>
        <div className="movie-trending lg:mt-[-10rem]">
          <CommonHorizontalList
            type="movieList"
            title="Trending"
            data={trendingMovies ? trendingMovies[0]?.videoIds : ""}
          />
        </div>
        <div className="movie-category">
          {movies && movies.length > 0 ? (
            <CommonHorizontalList
              type="movieList"
              title="Drama"
              data={movies[6]?.data}
            />
          ) : (
            <h1>loading</h1>
          )}
        </div>
        <div className="movie-genre">
          <div
            className="flex overflow-x-scroll pb-10 hide-scroll-bar"
            style={{}}>
            <div className="flex lg:ml-20 md:ml-10 ml-4 gap-8 ">
              {movies && movies.length ? (
                movies.map((category, index) => (
                  <div
                    onClick={handleCategoryClick(category.title)}
                    key={index}
                    className="relative inline-block w-[220px] sm:w-[280px] aspect-[280/200] overflow-hidden rounded-sm shadow-md bg-btnLight hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
                    <Image
                      fill
                      src="/images/actionGenre.svg"
                      alt="genre Image"
                    />
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
        </div>
        <div className="movie-poster2 hidden md:block">
          <Image
            src={movies[0]?.data[0].backdrop_path_full_path}
            height={592}
            width={1435}
            className="w-screen h-[592px] z-[2] relative"
            alt="poster"
          />

          <div className="movieDetails lg:pr-[60rem] relative top-[-6rem] text-white z-[4]">
            <MovieDetails
              title={movieData[0].Title}
              year={movieData[0].Year}
              runtime={movieData[0].Runtime}
              rated={movieData[0].Rated}
              imdbRating={movieData[0].imdbRating}
              plot={movieData[0].Plot}
              movieDetStyle="md:mt-[-15rem]"
              type="poster2"
            />
          </div>
        </div>
        <div className="movie-favorites mt-[7rem]">
          <CommonHorizontalList
            type="movieList"
            title="Mystery"
            data={movies[0]?.data}
          />
        </div>
        <div className="movie-kids">
          <CommonHorizontalList
            type="movieList"
            title="Romance"
            data={movies[1]?.data}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
