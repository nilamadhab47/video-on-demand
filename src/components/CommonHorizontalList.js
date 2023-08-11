import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
// import { data } from "@/utils/movieData";
import { genreData } from "@/utils/genreList";
import { MdArrowForward, MdOutlineArrowForwardIos } from "react-icons/md";
import { useRouter } from "next/router";
import { RxCross1 } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { AiFillLike, AiOutlineLike, AiOutlinePlusCircle } from "react-icons/ai";
import { BsBookmarks, BsFillBookmarksFill } from "react-icons/bs";
import { appsApi } from "@/utils/api";

const CommonHorizontalList = ({
  title,
  type,
  data,
  castData,
  handleCrossClick,
}) => {
  CommonHorizontalList.propTypes = {
    title: PropTypes.string,
    type: PropTypes.oneOf([
      "movieList",
      "genreList",
      "castList",
      "genreButtonList",
    ]).isRequired,
  };
  console.log("castData", castData);
  const router = useRouter();
  // const handleCategoryClick = (category) => {
  //   router.push(`/category/${category}`);
  // };
  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  }

  const [saveWatchLater, setSaveWatchLater] = useState(false);
  const [movies, setMovies] = useState([]);

  // Update the useEffect hook to initialize movies with data prop
  useEffect(() => {
    if (data && data.length > 0) {
      setMovies(data);
    }
  }, [data]);

  const handleBookmarkClick = async (movieId, type, event) => {
    event.stopPropagation();
    if (type === "like") {
      setMovies((prevMovies) => {
        return prevMovies.map((movie) => {
          if (movie.id === movieId) {
            return {
              ...movie,
              isLiked: !movie.isLiked, // Toggle the bookmark status for the clicked movie
            };
          }
          return movie;
        });
      });
    }
    if (type === "watchLatter") {
      setMovies((prevMovies) => {
        return prevMovies.map((movie) => {
          if (movie.id === movieId) {
            return {
              ...movie,
              isWatchLatter: !movie.isWatchLatter, // Toggle the bookmark status for the clicked movie
            };
          }
          return movie;
        });
      });
    }
    const body = {
      accountType: "Adult",
      type: type,
    };
    const response = await appsApi.post(
      `video/watchLatterOrLike/${movieId}`,
      body,
    );
    console.log("handle watch later button", response);
    setSaveWatchLater(true);
  };

  const handleBookMarkRemove = async (movieId, type, event) => {
    event.stopPropagation();
    const body = {
      type: type,
    };
    const response = await appsApi.delete(
      `video/watchLatterOrLike/${movieId}`,
      body,
    );
    console.log("handle remove watch later", response);
  };
  console.log("data from horizontal", data);
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200; // Adjust the scroll amount as needed
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200; // Adjust the scroll amount as needed
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < maxScrollLeft);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (type == "movieList") {
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-3 lg:gap-0">
          <h1 className="flex py-5 lg:px-4 md:pl-10 px-0 lg:ml-16 md:ml-0 ml-5 font-medium font14-22 font-poppins text-white transform transition-transform hover:scale-110">
            {title}
          </h1>
          <div className="transition-transform transform hover:translate-x-2">
            <Image
              src="/images/coolicon.png"
              alt="arrow"
              height={13}
              width={24}
              className="text-white w-7 sm:w-8 h-4 sm:h-6"
            />
          </div>
        </div>

        <div
          className="flex overflow-x-scroll pb-10 hide-scroll-bar"
          style={{}}
          ref={containerRef}>
          <div className="flex lg:ml-20 md:ml-10 ml-4 gap-8 pt-3">
            {movies && movies.length > 0 ? (
              movies.map((movieList, index) => (
                <div
                  onClick={() => router.push(`/movie/${movieList.id}`)}
                  key={index}
                  className={`cursor-pointer inline-block relative w-[143px] sm:w-60 aspect-[240/360] overflow-hidden rounded-lg hover:rounded-lg shadow-md bg-btnLight hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105`}
                  style={{
                    backgroundImage: `url(${movieList.poster_path_full_path})`,
                    backgroundSize: "contain",
                  }}>
                  <div className="h-[103px] bg-hoverBg text-white font-poppins relative top-[16.5rem] rounded-b-lg py-0 px-2 transform translate-y-[103px] opacity-0 transition-transform duration-300">
                    <div className="flex relative justify-between pt-2">
                      <p>
                        {movieList.title.length > 12
                          ? movieList.title.substring(0, 12) + "..."
                          : movieList.title}
                      </p>
                      <div className="flex gap-2 h-[25px] cursor-pointer">
                        <AiOutlinePlusCircle className="w-[25px] h-[25px] hover:scale-105 transition-all" />
                        {movieList.isLiked ? (
                          <AiFillLike
                            className="w-[22px] h-[22px] hover:scale-105 transition-all"
                            onClick={(event) =>
                              handleBookMarkRemove(movieList.id, "like", event)
                            }
                          />
                        ) : (
                          <AiOutlineLike
                            className="w-[25px] h-[25px] hover:scale-105 transition-all"
                            onClick={(event) =>
                              handleBookmarkClick(movieList.id, "like", event)
                            }
                          />
                        )}

                        {movieList.isWatchLatter ? (
                          <BsFillBookmarksFill
                            className="w-[22px] h-[22px] hover:scale-105 transition-all"
                            onClick={(event) =>
                              handleBookMarkRemove(
                                movieList.id,
                                "watchLatter",
                                event,
                              )
                            }
                          />
                        ) : (
                          <BsBookmarks
                            className="w-[22px] h-[22px] hover:scale-105 transition-all"
                            onClick={(event) =>
                              handleBookmarkClick(
                                movieList.id,
                                "watchLatter",
                                event,
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-7">
                      <Link
                        href={`/videoplayer/${encodeURIComponent(
                          "TheTomorrowWar.mp4",
                        )}`}
                        className="flex gap-3 h-[18.33px] items-center cursor-pointer hover:scale-110 hover:transition-transform"
                        onClick={(event) => event.stopPropagation()}>
                        <Image
                          src="/images/play-button.png"
                          alt="image"
                          width={18.33}
                          height={18.33}
                        />
                        Watch Now
                      </Link>
                      <p className="text-xs">
                        {timeConvert(movieList.runtime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer inline-block relative w-[143px] sm:w-60 aspect-[240/360] overflow-hidden rounded-lg shadow-md bg-btnLight hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 animate-pulse`}>
                    {/* <Image
                    fill
                    src={`${movieList.poster_path_full_path}`}
                    className="z-0 cursor-pointer ml-2 lg:ml-0"
                    alt="default_image"
                    onClick={() => router.push(`/movie/${movieList.id}`)}
                  /> */}
                    <div className="h-[103px] bg-gray-300 rounded-b-lg  text-white font-poppins relative top-[16.5rem] py-0 px-2 transform translate-y-[103px] opacity-0 transition-transform duration-300 rounded animate-pulse">
                      <div className="flex relative justify-between pt-2 rounded animate-pulse">
                        <div className="flex gap-2 h-[25px] cursor-pointer bg-gray-300 rounded animate-pulse"></div>
                      </div>
                      <div className="flex justify-between mt-7">
                        <p className="text-xs"></p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <button
          className="scroll-arrow right-arrow block h-1/2 bg-black w-[2%] opacity-0 hover:opacity-70"
          onClick={scrollRight}
          style={{ display: showRightArrow ? "block" : "none" }}>
          <i className="fas fa-chevron-right">
            <MdOutlineArrowForwardIos className="text-xl" />
          </i>
        </button>
      </div>
    );
  } else if (type === "watchLaterList") {
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-3 lg:gap-0">
          <h1 className="flex py-5 lg:px-4 md:pl-10 px-0 lg:ml-16 md:ml-0 ml-5 font-medium font14-22 font-poppins text-white">
            {title}
          </h1>
          <Image
            src="/images/coolicon.png"
            alt="arrow"
            height={13}
            width={24}
            // className="text-white w-7 sm:w-8 h-4 sm:h-6"
          />
        </div>
        <div
          className="flex overflow-x-scroll pb-10 hide-scroll-bar"
          style={{}}>
          <div className="flex lg:ml-20 md:ml-10 ml-4 gap-8 cursor-pointer">
            {data && data.length > 0 ? (
              data.map((movieList, index) => (
                <div
                  key={index}
                  className={`cursor-pointer inline-block relative w-[143px] sm:w-60 aspect-[240/360] overflow-hidden rounded-lg shadow-md bg-btnLight hover:shadow-xl transition-all duration-300 ease-in-out transform`}
                  style={{
                    backgroundImage: `url(${movieList.videoData.poster_path_full_path})`,
                    backgroundSize: "contain",
                  }}>
                  <div className="text-2xl float-right text-white opacity-0 transition-opacity duration-300">
                    <FaTimes
                      onClick={(event) =>
                        handleCrossClick(event, movieList.videoId)
                      }
                      style={{ strokeWidth: "2px", strokeLinecap: "round" }}
                    />
                  </div>
                  {/* <Image
                    fill
                    src={`${movieList.poster_path_full_path}`}
                    className="z-0 cursor-pointer ml-2 lg:ml-0"
                    alt="default_image"
                    onClick={() => router.push(`/movie/${movieList.id}`)}
                  /> */}
                  <div className="h-[103px] bg-hoverBg text-white font-poppins relative top-[16.5rem] rounded-b-lg py-0 px-2 transform translate-y-[103px] opacity-0 transition-transform duration-300">
                    <div className="flex relative justify-between pt-2">
                      <p
                        onClick={() =>
                          router.push(`/movie/${movieList.videoData.id}`)
                        }>
                        {movieList.videoData.title.length > 12
                          ? movieList.videoData.title.substring(0, 12) + "..."
                          : movieList.videoData.title}
                      </p>
                      <div className="flex gap-2 h-[25px] cursor-pointer">
                        <AiOutlinePlusCircle className="w-[25px] h-[25px] hover:scale-105 transition-all" />
                        <AiOutlineLike className="w-[25px] h-[25px] hover:scale-105 transition-all" />
                        {movieList.isWatchLatter ? (
                          <BsFillBookmarksFill
                            className="w-[22px] h-[22px] hover:scale-105 transition-all"
                            onClick={(event) =>
                              handleBookMarkRemove(
                                movieList.id,
                                "watchLatter",
                                event,
                              )
                            }
                          />
                        ) : (
                          <BsBookmarks
                            className="w-[22px] h-[22px] hover:scale-105 transition-all"
                            onClick={(event) =>
                              handleBookmarkClick(
                                movieList.id,
                                "watchLatter",
                                event,
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-7">
                      <Link
                        href={`/videoplayer/${encodeURIComponent(
                          "TheTomorrowWar.mp4",
                        )}`}
                        className="flex gap-3 h-[18.33px] items-center cursor-pointer hover:scale-110 hover:transition-transform">
                        <Image
                          src="/images/play-button.png"
                          alt="image"
                          width={18.33}
                          height={18.33}
                        />
                        Watch Now
                      </Link>
                      <p className="text-xs">
                        {timeConvert(movieList.videoData.runtime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer inline-block relative w-[143px] sm:w-60 aspect-[240/360] overflow-hidden rounded-lg shadow-md bg-btnLight hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 animate-pulse`}>
                    {/* <Image
                    fill
                    src={`${movieList.poster_path_full_path}`}
                    className="z-0 cursor-pointer ml-2 lg:ml-0"
                    alt="default_image"
                    onClick={() => router.push(`/movie/${movieList.id}`)}
                  /> */}
                    <div className="h-[103px] bg-gray-300 rounded-b-lg  text-white font-poppins relative top-[16.5rem] py-0 px-2 transform translate-y-[103px] opacity-0 transition-transform duration-300 rounded animate-pulse">
                      <div className="flex relative justify-between pt-2 rounded animate-pulse">
                        <div className="flex gap-2 h-[25px] cursor-pointer bg-gray-300 rounded animate-pulse"></div>
                      </div>
                      <div className="flex justify-between mt-7">
                        <p className="text-xs"></p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else if (type === "genreList") {
    return (
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar" style={{}}>
        <div className="flex lg:ml-20 md:ml-10 ml-4 gap-8 ">
          {genreData && genreData.length > 0 ? (
            genreData.map((genreList, index) => (
              <div
                key={index}
                className="relative inline-block w-[220px] sm:w-[280px] aspect-[280/200] overflow-hidden rounded-sm shadow-md bg-btnLight hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <Image fill src="/images/actionGenre.svg" alt="genre Image" />
                <div className="z-10 bg-black opacity-60 relative w-full h-full flex justify-center items-center">
                  <p className="font20-30 font-poppins font-medium text-white opacity-100">
                    {genreList.title}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>loading..</h1>
          )}
        </div>
      </div>
    );
  } else if (type === "castList") {
    return (
      <div className="flex flex-col">
        <h1 className="flex py-5 lg:px-4 md:px-10 px-0 lg:mx-16 md:mx-0 mx-5 font-medium font14-22 font-poppins text-white">
          {title}
        </h1>
        <div
          className="flex overflow-x-scroll pb-10 hide-scroll-bar"
          style={{}}>
          <div className="flex lg:ml-20 md:ml-10 ml-4 gap-8">
            {castData.map((cast, index) => (
              <div
                key={index}
                className={`inline-block relative w-[145px] h-[203px] overflow-hidden rounded-md shadow-md bg-btnLight hover:shadow-xl transition-shadow duration-300 ease-in-out`}>
                <Image
                  fill
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/h632/${cast.profile_path}`
                      : "/images/noImage.png"
                  }
                  alt="cast Image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (type === "genreButtonList") {
    return (
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar" style={{}}>
        <div className="flex lg:ml-[4.5rem] md:ml-8 ml-3 gap-4">
          {genreData.map((genreList, index) => (
            <div
              key={index}
              className="bg-transparent relative w-[120px] sm:w-[188px] h-[37.8px] sm:h-[58.73px] flex border-[2px] sm:border-[3px] border-white rounded-full justify-center items-center">
              <p className="text-[13px] sm:text-[20px] font-poppins font-medium text-white opacity-100">
                {genreList.genre}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  //  else if (type === "caraousel") {
  //   return (
  //     <div className="flex flex-col">
  //       <div
  //         className="flex overflow-x-scroll pb-10 hide-scroll-bar"
  //         style={{}}>
  //         <div className="flex lg:ml-20 md:ml-10 ml-4 gap-8">
  //           {data.map((movieList, index) => (
  //             <div
  //               key={index}
  //               className={`inline-block relative w-[820px] aspect-[820/430] overflow-hidden rounded-lg shadow-md bg-btnLight hover:shadow-xl transition-shadow duration-300 ease-in-out`}>
  //               <Image fill src={`${movieList.Poster}`} />
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
};

export default CommonHorizontalList;
