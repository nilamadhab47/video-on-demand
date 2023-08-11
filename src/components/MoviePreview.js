import React, { useRef, useEffect, useState } from "react";
import PageLoader from "./PageLoader";

const MoviePage = ({ movieUrl }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startPlayback = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = getRandomTime(); // Set random starting time
        videoRef.current.play();
      }
    };

    const endPlayback = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = getRandomTime(); // Set random starting time
      }
    };

    const getRandomTime = () => {
      // Generate a random time between 0 and 10 seconds
      return Math.random() * 10;
    };

    const handleVideoLoaded = () => {
      setIsLoading(false);
      startPlayback(); // Start the initial playback
    };

    const interval = setInterval(endPlayback, 10000); // Repeat every 10 seconds

    videoRef.current.addEventListener("loadedmetadata", handleVideoLoaded);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
      if (videoRef.current) {
        videoRef.current.removeEventListener(
          "loadedmetadata",
          handleVideoLoaded,
        );
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "10rem",
            left: "50%",
          }}>
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        src={movieUrl}
        controls={false}
        width="100%"
        height="auto"
        loop
        style={{
          display: isLoading ? "none" : "block",
          zIndex: 0,
          position: "relative",
        }}
      />
    </div>
  );
};

export default MoviePage;
