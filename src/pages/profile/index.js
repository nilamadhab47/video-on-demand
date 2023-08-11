import React, { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import ProfileCard from "@/components/ProfileCard";
import { appsApi } from "@/utils/api";
import { images } from "@/utils/AvatarImages";

export default function Profile() {
  const [profiles, setProfiles] = useState();
  const [manageProfileClicked, setManageProfileClicked] = useState(false);
  const togglemanageProfile = () => {
    setManageProfileClicked(!manageProfileClicked);
  };
  const fetchAllProfiles = async () => {
    try {
      const response = await appsApi.get("users/profiles");
      console.log(response);
      setProfiles(response.data.profiles);
    } catch (error) {
      console.log("profile ", error);
    }
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  console.log(profiles);
  return (
    <>
      <Head>
        <title>Profile</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-darkBg text-offWhiteTxt">
        <Navbar />
        <section className=" h-[45%] w-screen flex justify-center items-center ">
          <div className=" w-3/4 flex flex-col">
            <div className="text-white font-poppins m-auto text-center">
              <h3 className="font-semibold font20-30 pb-2 mb-8">
                Who is watching?
              </h3>
              <div className="flex justify-center items-center gap-4 sm:gap-12 mb-12 flex-nowrap">
                {profiles
                  ? profiles.map((profile, key) =>
                      profile.accountType === "Kid" ? (
                        <ProfileCard
                          key={key}
                          profileImage={images[profile.avatarIndex].src}
                          profileName={profile.username}
                          href={key}
                        />
                      ) : (
                        <ProfileCard
                          key={key}
                          profileImage={images[profile.avatarIndex].src}
                          profileName={profile.username}
                          href={key}
                          manageProfileClicked={manageProfileClicked}
                        />
                      ),
                    )
                  : ""}

                {/* <ProfileCard
                  profileImage={"/images/femaleAvatar.svg"}
                  profileName={"Rose"}
                  manageProfileClicked={manageProfileClicked}
                />
                <ProfileCard
                  profileImage={"/images/maleAvatar.svg"}
                  profileName={"John"}
                  manageProfileClicked={manageProfileClicked}
                /> */}
                {/* <Link href={"/profile/add"}>
                  <Image
                    src={"/images/addProfile.svg"}
                    height={75}
                    width={75}
                    className="ml-0 sm:ml-6 -mt-4 sm:-mt-10 h-[43.3px] w-[43.3px] sm:h-[75px] sm:w-[75px]"
                  />
                </Link> */}
              </div>
              <Button
                text="Manage Profile"
                type="submit"
                btnStyle="w-[158px] h-[44px] bg-btnDark text-[16px]"
                handleClick={togglemanageProfile}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
