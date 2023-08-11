import React, { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import ProfileCard from "@/components/ProfileCard";
import { images } from "@/utils/AvatarImages";
import { appsApi } from "@/utils/api";

export default function Account() {
  const [profiles, setProfiles] = useState();
  const [manageProfileClicked, setManageProfileClicked] = useState(false);
  const togglemanageProfile = () => {
    setManageProfileClicked(!manageProfileClicked);
  };
  const fetchAllProfiles = async () => {
    try {
      const response = await appsApi.get("users/getProfiles");
      console.log(response);
      setProfiles(response.data.profiles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);
  return (
    <>
      <Head>
        <title>Account</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen sm:h-[80vh] lg:h-[115vh] xl:h-screen bg-darkBg text-offWhiteTxt">
        <Navbar />
        <section className="absolute top-[10%] sm:top-[22%] w-full flex justify-center items-center gap-4 flex-wrap shrink">
          <div className=" w-10/12 sm:w-3/4 flex flex-col gap-2">
            <h3 className="font-semibold font-poppins font20-30 pb-8">
              Account Details
            </h3>
            <div className="flex justify-between items-baseline mb-2">
              <p>Peter@gmail.com</p>
              <Link href={"/account/changemailid"}>
                <p className="text-changeEmailtext hidden sm:flex">
                  Change email Address
                </p>
                <Image
                  src={"/images/editProfile.svg"}
                  width={20}
                  height={20}
                  className="h-[15px] w-[15px] sm:hidden"
                  alt="edit Profile"
                />
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <p>Password : ********</p>
              <Link href={"/account/changepassword"}>
                <p className="text-changeEmailtext hidden sm:flex">
                  Change password
                </p>
                <Image
                  src={"/images/editProfile.svg"}
                  width={20}
                  height={20}
                  className="h-[15px] w-[15px] sm:hidden"
                  alt="edit Profile"
                />
              </Link>
            </div>
            <hr className="h-px relative mt-4 mb-4 bg-HrBg border-0 dark:bg-HrBg" />
            <div className="flex justify-between items-center sm:flex-row sm:justify-between flex-wrap">
              <p className="font-semibold font20-30 mb-4">
                Security and Privacy
              </p>
              <p className="text-changeEmailtext">Sign out of all devices</p>
            </div>

            <hr className="h-px relative mt-4 mb-4 bg-HrBg border-0 dark:bg-HrBg" />
            <div className=" flex flex-col sm:flex-row justify-between">
              <p className="font-semibold font20-30 mb-4 whitespace-nowrap">
                Profile & Controls
              </p>
              <div className="flex-col justify-between w-3/4">
                {profiles &&
                  profiles.map((profile, key) => (
                    <div
                      className="flex justify-around items-center mb-2"
                      key={key}>
                      <div className="flex gap-4 items-center w-[29%]">
                        <Image
                          src={images[profile.avatarIndex].src}
                          width={124}
                          height={124}
                          className="h-[94px] w-[94px] sm:h-[124px] sm:w-[124px]"
                          alt="profile avatar"
                        />
                        <div className="flex-col">
                          <p className="sm:text-[18px]">{profile.username}</p>
                          <p className="font-normal text-sm text-placeHolderTxt whitespace-nowrap">
                            Account type {profile.accountType}
                          </p>
                        </div>
                      </div>
                      {profile.accountType === "Kid" ? (
                        <div>
                          <p className="hidden sm:flex text-[18px] gap-2 items-center">
                            Default
                          </p>
                          <Image
                            src={"/images/editProfile.svg"}
                            width={20}
                            height={20}
                            className="absolute right-[7%] sm:right-[13%] h-[15px] w-[15px] sm:hidden"
                            alt="edit Profile"
                          />
                        </div>
                      ) : (
                        <Link href={`/profile/${key}`}>
                          <p className="hidden sm:flex text-[18px] gap-2 items-center">
                            <Image
                              src={"/images/editProfile.svg"}
                              width={20}
                              height={20}
                              className="h-[10px] w-[10px] sm:h-[20px] sm:w-[20px]"
                              alt="edit Profile"
                            />
                            Edit
                          </p>
                          <Image
                            src={"/images/editProfile.svg"}
                            width={20}
                            height={20}
                            className="absolute right-[7%] sm:right-[13%] h-[15px] w-[15px] sm:hidden"
                            alt="edit Profile"
                          />
                        </Link>
                      )}
                    </div>
                  ))}

                {/* <div className="flex justify-around items-center mb-2">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={"/images/maleAvatar.svg"}
                      width={124}
                      height={124}
                      className="h-[94px] w-[94px] sm:h-[124px] sm:w-[124px]"
                    />
                    <div className="flex-col">
                      <p className="sm:text-[18px]">John</p>
                      <p className="font-normal text-sm text-placeHolderTxt whitespace-nowrap">
                        Account type Kids
                      </p>
                    </div>
                  </div>
                  <Link href={"/profile/edit"}>
                    <p className="hidden sm:flex text-[18px] gap-2 items-center">
                      <Image
                        src={"/images/editProfile.svg"}
                        width={20}
                        height={20}
                        className="h-[10px] w-[10px] sm:h-[20px] sm:w-[20px]"
                      />
                      Edit
                    </p>
                    <Image
                      src={"/images/editProfile.svg"}
                      width={20}
                      height={20}
                      className="absolute right-[7%] sm:right-[13%] h-[15px] w-[15px] sm:hidden"
                    />
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
