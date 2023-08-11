/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const videoId = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const videoSrc = videoId
    ? `https://admin.greatfilms.tv/uploads/videos/${videoId}`
    : "";

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    // Perform any client-side operations here
  }, []);

  return (
    <div>
      {typeof window !== "undefined" && (
        <div>
          <ReactPlayer
            playing={true}
            controls={true}
            url={videoSrc}
            light={
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/fast-and-furious-series-ranked-1565281200.jpg?crop=1.00xw:0.802xh;0,0.198xh&resize=1200:*"
                alt="Thumbnail"
              />
            }
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              background: "black",
            }}
          />
        </div>
      )}
    </div>
  );
};
export default videoId;
