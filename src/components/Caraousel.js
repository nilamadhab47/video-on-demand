/* eslint-disable @next/next/no-img-element */
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const Caraousel = ({ movieList }) => {
  return (
    <div className="carousel-react mt-2">
      <Carousel
        infiniteLoop
        showThumbs={false}
        autoPlay
        dynamicHeight={false}
        showStatus={false}
        showArrows={false}
        centerMode={true}
        centerSlidePercentage={60}>
        {movieList.map((image, index) => (
          <div key={index}>
            <img
              key={index}
              src={image}
              alt={`image-${index}`}
              //   style={{ height: "413px" }}
              className="image-caraousel"
            />
            <div className="watch-buttons md:flex hidden gap-4 mt-[-4rem] relative top-0 lg:left-[18.6rem] left-12 ">
              <Button
                text={`Watch Now`}
                type="text"
                btnStyle="md:py-[10px] md:px-[18px] w-[62px] h-[22px] md:w-[143px] md:h-full bg-white text-black rounded-[3px] text-[6px] md:text-sm font-poppins flex justify-center items-center gap-[7px]"
              />
              <Button
                text={`Watch Later`}
                type="text"
                btnStyle="md:py-[10px] md:px-[18px] w-[62px] h-[22px] md:w-[143px] md:h-full bg-movieBtn text-white rounded-[3px] text-[6px] md:text-sm font-poppins flex justify-center items-center gap-[7px]"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Caraousel;

Caraousel.prototype = {
  movieList: PropTypes.arrayOf(PropTypes.string),
};
