import React, { useState } from "react";
import Image from "next/image";

import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import AvatarModal from "./AvatarModal";

const AddOrEditProfile = ({
  isAdult,
  name,
  profilePicture,
  isProfileEditable,
  buttonSection,
  handleChange,
  images,
  handleIndex,
}) => {
  console.log("profile image avatarIndex", profilePicture);
  console.log("handleindex", handleIndex);
  // console.log(images);
  const [isOpen, setIsOpen] = useState(false);
  const [adult, setAdult] = useState(isAdult);
  const [profileImage, setProfileImage] = useState(images[profilePicture].src);
  console.log("profile", profileImage);
  // const [avatarIndex, setAvatarIndex] = useState(profilePicture);
  const toggleCheckBox = () => {
    setAdult(!adult);
  };
  const handleImage = (index) => {
    handleIndex(index);
    console.log("handleindex", handleIndex);

    setProfileImage(images[index].src);
  };
  return (
    <div className=" w-4/5 sm:w-3/4 top-[15%] flex flex-col shrink bg-darkBg">
      {isOpen && (
        <AvatarModal
          setIsOpen={setIsOpen}
          setProfileImage={setProfileImage}
          images={images}
          handleImage={handleImage}
        />
      )}
      <div className="text-white font-poppins m-auto">
        <h3 className="font-semibold font20-30 pb-2 mb-4 sm:mb-8">
          {isProfileEditable === true ? "Edit your profile" : "Add New Profile"}
        </h3>
        <div className="flex flex-wrap sm:flex-nowrap gap-8 sm:gap-12 mb-20 sm:mb-24">
          {isProfileEditable === true ? (
            <div>
              <Image
                src={profileImage}
                width={190}
                height={190}
                className="h-[109px] w-[109px] sm:h-[190px] sm:w-[190px]"
                alt="profile Image"
              />
              <button
                onClick={() => setIsOpen(true)}
                className="relative w-[23px] sm:w-[46px] h-[23px] sm:h-[46px] float-right -mt-[21%] sm:-mt-[50%] md:-mt-[30%] lg:-mt-[24%] bg-black opacity-50 bg-center flex items-center justify-center shrink">
                <Image
                  src={"/images/editProfile.svg"}
                  width={20}
                  height={20}
                  className="h-[10px] w-[10px] sm:h-[20px] sm:w-[20px]"
                  alt="profile Image"
                />
              </button>
            </div>
          ) : (
            <div>
              <Image
                src={images[profileImage].src}
                width={190}
                height={190}
                className="h-[109px] w-[109px] sm:h-[190px] sm:w-[190px]"
                alt="profile Image"
              />
            </div>
          )}

          <div className="flex flex-col justify-center gap-9 mt-0 sm:mt-8 w-[284px] sm:w-[352px] shrink">
            <Input
              type="email"
              placeholder="Enter username"
              value={name ? `${name}` : ""}
              inputStyles="px-5 w-full"
              handleChange={handleChange}
              id="username"
            />
            {/* <div className="flex gap-10 items-center">
              <div className="flex gap-8 text-[14px] leading-7">
                <Checkbox
                  checkboxStyle={{
                    width: "26.83px",
                    height: "26.83px",
                    borderRadius: "5px",
                    border: "4px solid white",
                  }}
                  checkboxLabel={"Adult"}
                  value="Adult"
                  id="accountType"
                  handleChange={handleChange}
                />
              </div>
              <div className="flex gap-8 text-[14px] leading-7">
                <Checkbox
                  checkboxStyle={{
                    width: "26.83px",
                    height: "26.83px",
                    borderRadius: "5px",
                    border: "4px solid white",
                  }}
                  checkboxLabel={"Children"}
                  checkboxlabelStyle={{ fontSize: "14px" }}
                  value="Kids"
                  id="accountType"
                  handleChange={handleChange}
                />
              </div>
            </div> */}
          </div>
        </div>
        {buttonSection}
      </div>
      <hr className="h-px sm:block hidden relative -mt-24 ml-[10%] -mr-[20%] bg-HrBg border-0 dark:bg-HrBg" />
    </div>
  );
};

export default AddOrEditProfile;
