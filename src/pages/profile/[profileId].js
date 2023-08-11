import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import AddOrEditProfile from "@/components/addOrEditProfile";
import { appsApi } from "@/utils/api";
import { images } from "@/utils/AvatarImages";
import { fetchProfileData } from "@/store/slices/profileSlice";

export default function EditProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profileId } = router.query;
  const [loading, setLoading] = useState(false);

  const fetchProfile = () => {
    dispatch(fetchProfileData());
  };

  const profileDataFromReducer = useSelector(
    (state) => state.profileData.user?.[0] || {},
  );

  useEffect(() => {
    fetchProfile();
  }, []);

  const [profileData, setProfileData] = useState({
    username: "",
    accountType: "",
    avatarIndex: profileDataFromReducer.avatarIndex
      ? profileDataFromReducer.avatarIndex
      : 0,
  });

  useEffect(() => {
    if (profileDataFromReducer.username) {
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        username: profileDataFromReducer.username,
        accountType: profileDataFromReducer.accountType,
      }));
    }

    if (profileDataFromReducer.avatarIndex !== undefined) {
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        avatarIndex: profileDataFromReducer.avatarIndex,
      }));
    }
  }, [profileDataFromReducer]);

  const handleIndex = (avatarData) => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      avatarIndex: avatarData,
    }));
  };

  const handleChange = (e) => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await appsApi.put(
        `users/profiles/${profileDataFromReducer.id}`,
        profileData,
      );
      console.log(response);
      router.push("/profile");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await appsApi.delete(`users/deleteProfile/${profileId}`);
      console.log(response);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-darkBg text-offWhiteTxt">
        <Navbar />
        <section className="absolute top-[20%] w-screen flex items-center justify-center sm:justify-center lg:justify-start flex-wrap sm:px-[5%]">
          <AddOrEditProfile
            name={profileData.username || ""}
            isAdult=""
            profilePicture={profileData.avatarIndex}
            isProfileEditable={true}
            images={images}
            handleIndex={handleIndex}
            handleChange={handleChange}
            buttonSection={
              <div className="flex gap-6 -mt-16 sm:mt-10 ">
                {loading ? (
                  <button
                    type="button"
                    className="w-[80px] h-[44px] bg-btnDark text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled>
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status">
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  </button>
                ) : (
                  <Button
                    text="Save"
                    type="submit"
                    btnStyle="w-[77px] h-[44px] bg-btnDark text-[16px]"
                    handleClick={handleSubmit}
                  />
                )}
                <Button
                  text="Cancel"
                  type="submit"
                  btnStyle="w-[94px] h-[44px] bg-btnDark text-[16px]"
                />
                {/* <Button
                  text="Delete"
                  type="submit"
                  btnStyle="w-[88px] h-[44px] bg-btnDark text-[16px]"
                  handleClick={handleDelete}
                /> */}
              </div>
            }
          />
        </section>
      </main>
    </>
  );
}
