import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Button from "./Button";
import { useRouter } from "next/router";
import Image from "next/image";
import { BiInfoCircle } from "react-icons/bi";
import { appsApi } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesData } from "@/store/slices/watchLaterSlice";

const MovieDetails = ({
  title,
  year,
  runtime,
  rated,
  genre,
  imdbRating,
  plot,
  type,
  movieDetStyle,
  movieId,
  isWatchLater,
}) => {
  const router = useRouter();
  console.log("isWatchLater", isWatchLater);
  const [removeLaterMovies, setRemoveLaterMovies] = useState(isWatchLater);
  console.log("remove watch later", removeLaterMovies);
  const dispatch = useDispatch();

  const fetchMovies = () => {
    dispatch(fetchMoviesData("watchLatter"));
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const watchLaterLists = useSelector((state) => {
    return state.movieLater.watchLater;
  });
  const movieToRemove = watchLaterLists.find((movie) => movie._id === movieId);
  console.log("movie to remove", movieToRemove);

  console.log("Watch later Movies Data from movie Details", watchLaterLists);
  const handleWatchNow = () => {
    router.push(`/videoplayer/${encodeURIComponent("FastandFurious9.mp4")}`);
  };

  const handleWatchLater = async () => {
    const body = {
      accountType: "Adult",
      type: "watchLatter",
    };
    const response = await appsApi.post(
      `video/watchLatterOrLike/${movieId}`,
      body,
    );
    console.log("handle watch later", response);
    setRemoveLaterMovies(true);
    fetchMovies();
  };
  const handleRemoveWatchLater = async () => {
    fetchMovies(); // Call fetchMovies to update the watchLaterLists array
    const movieToRemove = watchLaterLists.find(
      (movie) => movie._id === movieId,
    );
    console.log("movie to remove remove function", movieToRemove);

    if (movieToRemove) {
      const response = await appsApi.delete(
        `video/watchLatterOrLike/${movieToRemove.videoId}`,
      );
      console.log("handle remove watch later", response);
    }
  };

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  }

  if (type === "mobile") {
    return (
      <div className="video-details md:mt-[-16rem] md:ml-16 ml-28 mt-[-2rem] pb-8 text-center">
        <h1 className="lg:text-[59px] md:text-[45px] text-l font-semibold">
          {title}{" "}
        </h1>

        <div>
          <p className="mb-4 text-[10px] md:text-l lg:text-xl font-normal ">
            {plot}
          </p>
        </div>

        <div className="watch-buttons flex gap-12 mt-4">
          <Button
            handleClick={handleWatchLater}
            text={`Watch Later`}
            type="text"
            btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-black text-white rounded-[3px] text-[10px] md:text-l font-poppins flex flex-col items-center h-[26px] justify-center"
          />
          <Button
            text={`Watch Now`}
            type="text"
            btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-white text-black rounded-[3px] text-[10px] md:text-l font-poppins flex justify-center items-center gap-[7px]"
            handleClick={handleWatchNow}
            showTick={removeLaterMovies}
          />
          <div className="info text-xs">
            <BiInfoCircle />
            <span>info</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "poster2") {
    return (
      <div className={`video-details md:ml-16 ml-4 pb-8 ${movieDetStyle}`}>
        <h1 className="md:text-[59px] text-l">{title} </h1>
        <div className="movie--sub-details flex gap-4 text-[9px] md:text-[15px] font-poppins ">
          <p>{year}</p>
          <li>{timeConvert(runtime)}</li>
          <li>{rated}</li>
        </div>
        <div>
          <p className="mb-4 text-[10px] md:text-l lg:text-xl font-normal hidden md:block">
            {plot}
          </p>
        </div>
        <div className="imdb-rating flex gap-4 items-center">
          <div className="">
            <Image src="/images/imdb.png" alt="" width={38} height={18.34} />
          </div>
          <div>
            <StarRating rating={imdbRating} />
          </div>
          <p className="">{imdbRating}</p>
        </div>
        <div className="watch-buttons flex gap-4 mt-4 font-semibold items-center">
          <Button
            text={`Watch Now`}
            type="text"
            btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-white text-black rounded-[3px] text-[10px] md:text-l font-poppins flex justify-center items-center gap-[7px] text"
            handleClick={handleWatchNow}
          />
          {isWatchLater ? (
            <Button
              handleClick={handleRemoveWatchLater}
              showTick={removeLaterMovies}
              text={`Remove Later`}
              type="text"
              btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-movieBtn text-white rounded-[3px] text-[10px] md:text-l font-poppins flex justify-center items-center gap-[7px]"
            />
          ) : (
            <Button
              handleClick={handleWatchLater}
              showTick={removeLaterMovies}
              text={`Watch Later`}
              type="text"
              btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-movieBtn text-white rounded-[3px] text-[10px] md:text-l font-poppins flex justify-center items-center gap-[7px]"
            />
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={`video-details md:ml-16 ml-4 pb-8 ${movieDetStyle}`}>
      <h1 className="lg:text-[59px] md:text-[45px] text-l">{title}</h1>

      <div>
        <p className="mb-4 text-[10px] md:text-l lg:text-xl font-normal hidden md:block">
          {plot && plot.length > 300 ? plot.substring(0, 299) + "..." : plot}
        </p>
      </div>

      <div className="watch-buttons flex gap-4 mt-4 font-semibold items-center">
        <Button
          text={`Watch Now`}
          type="text"
          btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-white text-black rounded-[3px] text-[10px] md:text-l font-poppins flex justify-center items-center gap-[7px] text"
          handleClick={handleWatchNow}
        />
        {isWatchLater ? (
          <Button
            handleClick={handleRemoveWatchLater}
            showTick={removeLaterMovies}
            text={`Remove Later`}
            type="text"
            btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-movieBtn text-white rounded-[3px] text-[10px] md:text-l font-poppins flex justify-center items-center gap-[7px]"
          />
        ) : (
          <Button
            handleClick={handleWatchLater}
            showTick={removeLaterMovies}
            text={`Watch Later`}
            type="text"
            btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-black text-white rounded-[3px] text-[10px] md:text-l font-poppins flex justify-center items-center gap-[7px]"
          />
        )}

        <div className="wrapper">
          <div className="card">
            <h1 className="text-2xl">
              <BiInfoCircle />
            </h1>
            <div>
              <div className="movie--sub-details flex gap-4 text-[9px] md:text-[15px] font-poppins ">
                <p>{year}</p>
                <li>{timeConvert(runtime)}</li>
                <li>{rated}</li>
              </div>
              <div className="imdb-rating flex gap-4 items-center">
                <div className="">
                  <Image
                    src="/images/imdb.png"
                    alt=""
                    width={38}
                    height={18.34}
                  />
                </div>
                <div>
                  <StarRating rating={imdbRating} />
                </div>
                <p className="">{imdbRating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
