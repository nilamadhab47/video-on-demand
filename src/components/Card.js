import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Card = ({ title, image, time }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  }
  return (
    <div
      className={`inline-block relative w-[143px] sm:w-60 aspect-[240/360] overflow-hidden rounded-lg shadow-md bg-btnLight hover:shadow-xl transition-shadow duration-300 ease-in-out`}>
      <Image
        fill
        src={image}
        className={`z-0 cursor-pointer `}
        alt="default_image"
        onClick={() => router.push("/movie")}
      />
      <div className="h-[103px] bg-hoverBg text-white font-poppins relative top-[16.5rem] rounded-b-lg py-0 px-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex relative justify-between pt-2">
          <p>{title.length > 12 ? title.substring(0, 12) + "..." : title}</p>
          <div className="flex gap-2 h-[25px] cursor-pointer">
            <Image
              src="/images/addto.png"
              alt="addto image"
              width={25}
              height={25}
              className="hover:scale-110"
            />
            <Image
              src="/images/liked.png"
              alt="addto image"
              width={25}
              height={25}
              className="hover:scale-110"
            />
            <Image
              src="/images/down-arrow.png"
              alt="addto image"
              width={25}
              height={25}
              className="hover:scale-110"
            />
          </div>
        </div>
        <div className="flex justify-between mt-7">
          <Link
            href={`/videoplayer/${encodeURIComponent("TheTomorrowWar.mp4")}`}
            className={`flex gap-3 h-[18.33px] items-center cursor-pointer hover:scale-110`}>
            <Image
              src="/images/play-button.png"
              alt="image"
              width={18.33}
              height={18.33}
              className={`z-0 cursor-pointer ${isHovered ? "scale-110" : ""}`}
            />
            Watch Now
          </Link>
          <p className="text-xs">{timeConvert(time)}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
