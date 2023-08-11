import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProfileCard = ({
  profileImage,
  profileName,
  manageProfileClicked,
  key,
  href,
}) => {
  return (
    <div className="flex-col">
      {manageProfileClicked === true ? (
        <div key={key}>
          <Link href={`profile/${href}`}>
            <Image
              src={profileImage}
              width={190}
              height={190}
              className="mb-4 h-[109px] w-[109px] sm:h-[190px] sm:w-[190px]"
              alt="profile pic"
            />
            <button className="h-[109px] w-[109px] sm:h-[190px] sm:w-[190px] -mt-[114.5%] sm:-mt-[108.5%] mb-4 bg-black opacity-50 bg-center flex items-center justify-center shrink">
              <Image
                src={"/images/editProfile.svg"}
                width={54}
                height={54}
                className="h-[27px] w-[27px] sm:h-[54px] sm:w-[54px]"
                alt="edit profile"
              />
            </button>
            <p className="font20-30">{profileName}</p>
          </Link>
        </div>
      ) : (
        <div>
          <Image
            src={profileImage}
            width={190}
            height={190}
            className="mb-4 h-[109px] w-[109px] sm:h-[190px] sm:w-[190px]"
            alt="profile pic"
          />
          <p className="font20-30">{profileName}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
