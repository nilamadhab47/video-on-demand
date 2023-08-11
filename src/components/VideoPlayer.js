// // import "vidstack/styles/base.css";
// // import "vidstack/styles/ui/buttons.css";
// // import "vidstack/styles/ui/buffering.css";
// // import "vidstack/styles/ui/captions.css";
// // import "vidstack/styles/ui/tooltips.css";
// // import "vidstack/styles/ui/live.css";
// // import "vidstack/styles/ui/sliders.css";
// // import "vidstack/styles/ui/menus.css";

// // import {
// //   MediaOutlet,
// //   MediaPlayer,
// //   MediaBufferingIndicator,
// //   MediaPlayButton,
// //   MediaSeekButton,
// //   MediaTimeSlider,
// //   MediaSliderValue,
// //   MediaMenu,
// //   MediaMenuButton,
// //   SettingsIcon,
// //   MediaMenuItems,
// //   MediaQualityMenuButton,
// //   MediaQualityMenuItems,
// //   MediaPlaybackRateMenuButton,
// //   MediaPlaybackRateMenuItems,
// // } from "@vidstack/react";
// // import { useRouter } from "next/router";

// // export function VideoPlayer({ videoSrc }) {
// //   return (
// //     <MediaPlayer
// //       aspect-ratio={16 / 9}
// //       autoplay
// //       title="Fast and Furious"
// //       src={videoSrc}
// //       poster="https://media-files.vidstack.io/poster.png">
// //       <MediaOutlet>
// //         {/* ^ remove `controls` attribute if you're designing a custom UI */}
// //         <MediaBufferingIndicator />
// //         <MediaPlayButton />
// //         <MediaSeekButton seconds={+30} />
// //         {/* seek backwards */}
// //         <MediaSeekButton seconds={-30} />
// //         <MediaTimeSlider>
// //           <MediaSliderValue type="pointer" format="time" slot="preview" />
// //         </MediaTimeSlider>
// //         <MediaMenu position="top">
// //           <MediaMenuButton aria-label="Settings">
// //             <SettingsIcon data-rotate />
// //           </MediaMenuButton>
// //           <MediaMenuItems>
// //             <MediaMenu>
// //               <MediaQualityMenuButton label="Quality"></MediaQualityMenuButton>
// //               <MediaQualityMenuItems autoLabel="Auto" />
// //               <MediaPlaybackRateMenuButton label="Speed"></MediaPlaybackRateMenuButton>
// //               <MediaPlaybackRateMenuItems
// //                 rates={[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]}
// //                 normalLabel="Normal"
// //               />
// //             </MediaMenu>
// //           </MediaMenuItems>
// //         </MediaMenu>
// //       </MediaOutlet>
// //     </MediaPlayer>
// //   );
// // }

// import React from "react";
// import {
//   Player,
//   ControlBar,
//   ReplayControl,
//   ForwardControl,
//   CurrentTimeDisplay,
//   TimeDivider,
//   PlaybackRateMenuButton,
//   VolumeMenuButton,
//   BigPlayButton,
// } from "video-react";
// import "node_modules/video-react/dist/video-react.css";

// export function VideoPlayer({ videoSrc }) {
//   return (
//     <div className="mx-auto my-0">
//       <Player
//         aspectRatio="16:9"
//         poster="https://static-koimoi.akamaized.net/wp-content/new-galleries/2021/02/fast-furious-9-trailer-info-leaked-han-bow-wow-as-twinkie-to-make-a-comeback-001.jpg"
//         autoPlay={true}>
//         <source src={videoSrc} />
//         <source src={videoSrc} />
//         <BigPlayButton position="center" />
//         <ControlBar>
//           <ReplayControl seconds={10} order={1.1} />
//           <ForwardControl seconds={30} order={1.2} />
//           <CurrentTimeDisplay order={4.1} />
//           <TimeDivider order={4.2} />
//           <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
//           <VolumeMenuButton />
//         </ControlBar>
//       </Player>
//     </div>
//   );
// }

import React from "react";
import ReactPlayer from "react-player/lazy";

const VideoPlayer = ({ videoSrc }) => {
  return (
    <>
      <ReactPlayer url={videoSrc} />
    </>
  );
};

export default VideoPlayer;
