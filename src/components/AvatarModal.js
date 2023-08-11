import React, { useState } from "react";
import Image from "next/image";
import { images } from "@/utils/AvatarImages";

import Button from "./Button";

const AvatarModal = ({ setIsOpen, handleImage, avatarIndex }) => {
  // const [imageKey, setImageKey] = useState(avatarIndex);
  // const handleClick = () => {
  //   setImageKey(index);
  //   handleImage();
  // };
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  return (
    <div className="absolute bg-AvatarModalBg max-w-screen-md  border-2 p-4 xl:p-8 border-AvatarModalBorder -top-[15%] sm:-top-[10%] left-[10%] sm:left-[15%] lg:left-[20%] right-[10%] sm:right-[15%] flex-col justify-center items-center text-center gap-6 z-50">
      <h3 className="font-semibold font20-30 sm:pb-2 mb-2 sm:mb-4">
        Select Your Avatar
      </h3>
      <div className="flex-col gap-4 mb-2 md:mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 sm:gap ">
          {images.map((image, index) => (
            <div
              className={`relative mb-4 cursor-pointer width100-160 aspect-square m-auto sm:px-2 hover:outline-offset-4 hover:outline hover:outline-4 hover:outline-red-500 ${
                selectedImageIndex === index
                  ? "outline-offset-4 outline outline-4 outline-red-500"
                  : ""
              } `}
              key={index}>
              <Image
                id="avatarIndex"
                key={index}
                src={image.src}
                alt="avatar-images"
                fill
                onClick={() => {
                  // console.log(index)
                  setSelectedImageIndex(index);
                  handleImage(index);
                }}
              />
            </div>
          ))}

          {/* <div className="relative mb-4 cursor-pointer width100-160 aspect-square m-auto sm:px-2">
            <Image
              src={"/images/femaleAvatar.svg"}
              fill
              onClick={() => setProfileImage("/images/femaleAvatar.svg")}
            />
          </div>
          <div className="relative mb-4 cursor-pointer width100-160 aspect-square m-auto">
            <Image
              src={"/images/Avatar6.svg"}
              fill
              onClick={() => setProfileImage("/images/femaleAvatar.svg")}
            />
          </div>
          <div className="relative mb-4 cursor-pointer width100-160 aspect-square m-auto">
            <Image
              src={"/images/Avatar1.svg"}
              fill
              onClick={() => setProfileImage("/images/femaleAvatar.svg")}
            />
          </div>
          <div className="relative mb-4 cursor-pointer width100-160 aspect-square m-auto">
            <Image
              src={"/images/Avatar2.svg"}
              fill
              onClick={() => setProfileImage("/images/femaleAvatar.svg")}
            />
          </div>
          <div className="relative mb-4 cursor-pointer width100-160 aspect-square m-auto">
            <Image
              src={"/images/Avatar3.svg"}
              fill
              onClick={() => setProfileImage("/images/femaleAvatar.svg")}
            />
          </div>
          <div className="relative mb-4 cursor-pointer width100-160 aspect-square m-auto">
            <Image
              src={"/images/Avatar4.svg"}
              fill
              onClick={() => setProfileImage("/images/femaleAvatar.svg")}
            />
          </div>
          <div className="relative mb-4 cursor-pointer width100-160 aspect-square m-auto">
            <Image
              src={"/images/Avatar5.svg"}
              fill
              onClick={() => setProfileImage("/images/femaleAvatar.svg")}
            />
          </div>
          <div className="relative mb-4 cursor-pointer width100-160 aspect-square m-auto">
            <Image
              src={"/images/Avatar6.svg"}
              fill
              onClick={() => setProfileImage("/images/femaleAvatar.svg")}
            />
          </div> */}
        </div>
      </div>
      <div className="flex gap-4 m-auto justify-center">
        <Button
          text="Submit"
          type="submit"
          btnStyle="w-[95px] sm:w-[111px] h-[44px] bg-btnDark text-[16px] p-0"
          handleClick={() => setIsOpen(false)}
        />
        <Button
          text="Close"
          type="submit"
          btnStyle="w-[95px] sm:w-[111px] h-[44px] bg-btnDark text-[16px] p-0"
          handleClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default AvatarModal;
