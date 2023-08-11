import Button from "@/components/Button";
import useMovieDetails from "@/hooks/useMovieDetails";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CommonHorizontalList = dynamic(
  () => import("../../components/CommonHorizontalList"),
  { ssr: false },
);
const MoviePage = dynamic(() => import("../../components/MoviePreview"), {
  ssr: false,
});
const StarRating = dynamic(() => import("../../components/StarRating"), {
  ssr: false,
});

const movieId = () => {
  const router = useRouter();
  const { movieId } = router.query;
  console.log("movieId", movieId);

  const { movie, relatedMovies, firstGenreMovies } = useMovieDetails(movieId);

  console.log("movie:", movie);
  console.log("relatedMovies:", relatedMovies);
  console.log("firstGenreMovies:", firstGenreMovies);

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  }

  return (
    <div className="w-screen h-screen bg-movieBg text-white overflow-x-hidden">
      <div className="video-section bg-black text-white">
        <div>
          <div className="video w-screen md:h-[611px] h-[69px]">
            <MoviePage movieUrl={movie?.videoLink} />
          </div>

          <div className="video-details md:mt-[-16rem] md:ml-16 ml-4 pb-8 relative hidden md:block">
            <h1 className="md:text-[59px] text-l">{movie?.title} </h1>
            <div className="movie--sub-details flex gap-4 text-[9px] md:text-[15px] font-poppins ">
              <p>{movie?.release_date.substr(0, 4) ?? ""}</p>
              {movie ? <li>{timeConvert(movie?.runtime) ?? ""}</li> : ""}
              {movie ? <li>Adult</li> : ""}
              {movie ? (
                <li>
                  {movie?.genres.map((genre) => genre.name).join(", ") ?? ""}
                </li>
              ) : (
                ""
              )}
            </div>
            <div className="imdb-rating flex gap-4 items-center">
              <div className="">
                {movie ? (
                  <Image
                    src="/images/imdb.png"
                    alt=""
                    width={38}
                    height={18.34}
                  />
                ) : (
                  ""
                )}
              </div>
              <div>
                {movie ? <StarRating rating={movie?.vote_average} /> : ""}
              </div>
              <p className="">{movie?.vote_average ?? ""}</p>
            </div>
            <div className="watch-buttons flex gap-4 mt-4">
              {movie ? (
                <>
                  <Button
                    text={`Watch Now`}
                    type="text"
                    btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-white text-black rounded-[3px] text-[10px] md:text-l flex justify-center items-center gap-[7px]"
                  />
                  <Button
                    text={`Watch Later`}
                    type="text"
                    btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-white text-black rounded-[3px] text-[10px] md:text-l flex flex-col items-center"
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="video-details md:mt-[-16rem] md:ml-16 ml-4 pb-8 relative md:hidden">
            <h1 className="md:text-[59px] text-l">{movie?.title ?? ""} </h1>
            <div className="movie--sub-details flex gap-1 text-[9px] md:text-[15px] font-poppins flex-col">
              <div className="flex gap-4">
                <p>{movie?.release_date.substr(0, 4) ?? ""}</p>
                {movie ? <li>{timeConvert(movie?.runtime)}</li> : ""}
              </div>
              <div className="flex gap-4">
                <li className="list-none">Adult</li>
                <li>
                  {movie?.genres.map((genre) => genre.name).join(", ") ?? ""}
                </li>
              </div>
            </div>

            <div className="watch-buttons flex gap-4 mt-4">
              {movie ? (
                <>
                  {" "}
                  <Button
                    text={`Watch Now`}
                    type="text"
                    btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[22px] md:w-[162px] md:h-full bg-white text-black rounded-[3px] text-[10px] md:text-l flex justify-center items-center gap-[7px]"
                  />
                  <Button
                    text={`Watch Later`}
                    type="text"
                    btnStyle="md:py-[10px] md:px-[18px] w-[82px] h-[26px] md:w-[162px] md:h-full bg-black text-white rounded-[3px] text-[10px] md:text-l flex flex-col items-center"
                  />
                </>
              ) : (
                " "
              )}
              <div className="imdb-rating flex gap-1 items-center">
                <div className="">
                  <Image
                    src="/images/imdb.png"
                    alt=""
                    width={38}
                    height={18.34}
                  />
                </div>
                <div>
                  {movie ? <StarRating rating={movie?.vote_average} /> : ""}
                </div>
                <p className="text-[11px]">
                  {movie?.vote_average.toString().slice(0, 3) ?? ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="details-section lg:pr-32 md:pr-8 lg:pl-40 md:pl-12 2xl:mt-[6%]">
        <div className="movie-plot font-poppins lg:ml-[16.4rem] md:ml-[12.4rem] relative lg:top-[9.4rem] md:top-[8.4rem] mx-2">
          <div className="md:text-xl mb-4 mt-4 md:mt-0">Storyline</div>{" "}
          {!movie ? (
            <>
              <div className="h-4 w-full bg-gray-300 animate-pulse mb-1 ml-10"></div>
              <div className="h-4 w-5/6 bg-gray-300 animate-pulse mb-4 ml-10"></div>
            </>
          ) : (
            <div className="mb-4 text-[10px] md:text-l">{movie?.overview}</div>
          )}
        </div>
        <div className="movie-details flex items-center 2xl:relative">
          <div className="movie-poster">
            {!movie ? (
              <div className="h-[360px] w-[240px] bg-gray-300 animate-pulse"></div>
            ) : (
              <Image
                src={movie?.poster_path_full_path}
                alt="movie-poster"
                className="md:w-[240px] md:h-[360px] w-[140px] h-[203px] object-contain"
                height={360}
                width={240}
              />
            )}
          </div>
          <div className="movie-details--plot font-poppins text-[10px] md:text-l relative left-5 lg:left-16 w-[172px] md:w-full md:top-[3rem]">
            <div className="mb-3">
              Director:{" "}
              {!movie ? (
                <div className="h-4 w-40 bg-gray-300 animate-pulse"></div>
              ) : (
                movie?.castCrewMovieData &&
                [
                  ...new Set(
                    movie?.castCrewMovieData.crew
                      .filter(
                        (person) => person.known_for_department === "Directing",
                      )
                      .map((director) => director.name),
                  ),
                ].join(", ")
              )}
            </div>
            <div className="mb-3">
              Writer :{" "}
              {!movie ? (
                <div className="h-4 w-40 bg-gray-300 animate-pulse"></div>
              ) : (
                [
                  ...new Set(
                    movie?.castCrewMovieData?.crew
                      .filter(
                        (person) => person.known_for_department === "Writing",
                      )
                      .map((Writer) => Writer.name),
                  ),
                ].join(", ")
              )}
            </div>
            <div className="mb-3">
              Cast :{" "}
              {!movie ? (
                <div className="h-4 w-40 bg-gray-300 animate-pulse"></div>
              ) : (
                [
                  ...new Set(
                    movie?.castCrewMovieData?.cast
                      .filter(
                        (person) => person.known_for_department === "Acting",
                      )
                      .map((actor) => actor.name),
                  ),
                ]
                  .slice(0, 10)
                  .join(", ")
              )}
            </div>
            <div>
              Availabel :{" "}
              {!movie ? (
                <div className="h-4 w-40 bg-gray-300 animate-pulse"></div>
              ) : (
                movie?.spoken_languages
                  .map((lang) => lang.english_name)
                  .join(", ")
              )}
            </div>
          </div>
        </div>
        <div className="related-movie md:ml-[-5rem]">
          <CommonHorizontalList
            type={"movieList"}
            title="Related Movies"
            data={relatedMovies}
          />
        </div>
        <div className="related-movie--genre md:ml-[-5rem]">
          {/* <CommonHorizontalList
            type={"movieList"}
            title={`${movie.Genre} movies`}
            data={movies[8]?.data}
          /> */}
        </div>
        <div className="cast-section md:ml-[-5rem]">
          <CommonHorizontalList
            title={"Cast"}
            type={"castList"}
            MovieListStyles="w-[140px] sm:w-[143px] h-[203px] sm:h-[203px]"
            castData={[
              ...new Set(
                movie?.castCrewMovieData?.cast
                  .filter((person) => person.known_for_department === "Acting")
                  .map((actor) => actor),
              ),
            ].slice(0, 10)}
          />
        </div>
      </div>
    </div>
  );
};

export default movieId;
