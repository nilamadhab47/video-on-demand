/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { AiOutlineBell } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import ExpandibleSearchBar from "./ExpandibleSearchBar";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData } from "@/store/slices/profileSlice";
import { images } from "@/utils/AvatarImages";
import { useRouter } from "next/router";
import useMovieSearch from "@/hooks/useMovieSearch";

const Navbar = ({ type, onSearch }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  // const [showMobileSearchBar, setShowMobileSearchBar] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchBarExpand, setShowSearchBarExpand] = useState(false);
  // const { searchResults, relatedMovies, handleSearch } = useMovieSearch();

  const fetchProfile = () => {
    dispatch(fetchProfileData());
  };

  const profileDataFromReducer = useSelector((state) => {
    console.log("Navbar state..", state.profileData);
    console.log("Navbar state.. user[0]", state.profileData.user[0]);
    if (state.profileData.user && state.profileData.user.length > 0) {
      console.log(
        "Navbar state.. username",
        state.profileData.user[0].username,
      );
    }

    return state.profileData;
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  const handleMobileNavbar = () => {
    setMobileNavbar(true);
  };

  const handleBackClick = () => {
    setShowSearchBar(false);
  };
  // const handleSearchChange = (e) => {
  //   console.log("handle search change", e.target.value);
  //   setSearchQuery(e.target.value);
  // };
  // console.log("search query", searchQuery);
  // const handleSearchSubmit = (e) => {
  //   // e.preventDefault();
  //   // handleSearch(searchQuery);
  //   router.push({
  //     pathname: "/searchedMovie",
  //     query: { query: searchQuery },
  //   });
  // };

  if (type === "home") {
    return (
      <>
        {mobileNavbar ? (
          <div
            className={`mobile navbar lg:hidden bg-black z-50 text-white h-screen w-screen`}>
            <div
              className="block float-right mt-8 mr-8 text-2xl"
              onClick={() => setMobileNavbar(false)}>
              <RxCross1 />
            </div>
            <ul className="text-center pt-[50%] text-xl">
              <li onClick={() => router.push("/home")} className="mb-4">
                Home
              </li>
              <li onClick={() => router.push("/kids")} className="mb-4">
                Kids
              </li>
              <li onClick={() => router.push("/mylist")} className="mb-4">
                My List
              </li>
              <li onClick={() => router.push("/popular")} className="mb-4">
                New & Popular
              </li>
              <li onClick={() => router.push("/browse")} className="mb-4">
                Browse
              </li>
            </ul>
          </div>
        ) : (
          <>
            <nav
              className="flex justify-between items-center py-8 ml-0 lg:ml-0 md:ml-0 lg:gap-0 md:gap-0 gap-8 sm:pr-20 relative z-[100]"
              style={{
                background:
                  "linear-gradient(180deg, #000000 28.19%, rgba(0, 0, 0, 0.71) 54%, rgba(0, 0, 0, 0.35) 80.18%, rgba(0, 0, 0, 0) 100%)",
              }}>
              <Link href="/" className="ml-2 lg:ml-12">
                <div className="flex items-center">
                  <Image
                    src={"/images/play.svg"}
                    height={20}
                    width={20}
                    className="h-[13px] sm:h-[16px] w-[11px] sm:w-[16px]"
                    alt="play"
                  />
                  <p className="font-inter font-medium font10-18 ml-2 text-white w-[98px] md:w-auto whitespace-nowrap pr-4">
                    Video On Demand
                  </p>
                </div>
              </Link>
              <div className="text-white md:mr-36 lg:mr-0 font-poppins font10-18 sm:ml-8 pr-4">
                <ul className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 cursor-pointer menu3">
                  <li>
                    <Link href="/home">Home</Link>
                  </li>
                  <li className="lg:block md:hidden hidden">
                    <Link href="/kids">Kids</Link>
                  </li>
                  <li className="lg:block md:hidden hidden">
                    <Link href="/mylist">My List</Link>
                  </li>
                  <li className="lg:block md:hidden hidden">
                    <Link href="/popular">New & Popular</Link>
                  </li>
                  <li className="lg:block md:hidden hidden">
                    <Link href="/browse">Browse</Link>
                  </li>
                  <li
                    className="lg:hidden md:block block "
                    onClick={handleMobileNavbar}>
                    <MdKeyboardArrowDown />
                  </li>
                </ul>
              </div>
              <div className="text-white lg:text-3xl md:text-[22px] text-[15px] mr-4 sm:mr-20 md:mr-0">
                <ul className="flex gap-4 sm:gap-2 xl:gap-4 items-center">
                  <li className="md:hidden">
                    {showSearchBar ? (
                      <ExpandibleSearchBar
                        handleBackClick={handleBackClick}
                        showSearchBar={showSearchBar}
                      />
                    ) : (
                      <BiSearch
                        className="sm:hidden"
                        onClick={() => {
                          setShowSearchBar(!showSearchBar);
                        }}
                      />
                    )}
                  </li>

                  <li className="hidden md:block">
                    <BiSearch className="sm:hidden" />
                    <ExpandibleSearchBar />
                  </li>

                  <li className="lg:block md:block hidden">
                    <span className="bell fa fa-bell">
                      <AiOutlineBell />
                    </span>
                  </li>
                  <li>
                    <Link href="/profile">
                      <img
                        src={
                          profileDataFromReducer.user[0]
                            ? images[profileDataFromReducer.user[0].avatarIndex]
                                .src
                            : "/images/femaleAvatar.svg"
                        }
                        alt="image"
                        className="block lg:w-[30px] lg:h-[30px] md:w-[22px] md:h-[22px] w-[15px] h-[15px] rounded-[50px]"
                      />
                    </Link>
                  </li>
                  <li
                    className="lg:block md:hidden hidden cursor-pointer"
                    onClick={() => setShowOptions(!showOptions)}>
                    <MdKeyboardArrowDown
                      className={`${
                        showOptions
                          ? "rotate-180 transition-all"
                          : " rotate-0 transition-all"
                      }`}
                    />
                  </li>
                </ul>
              </div>
            </nav>
            <div
              className={`bg-black text-white font-poppins w-32 h-0 float-right relative left-[-1rem] top-[-1rem] pt-5 z-[100] ${
                showOptions ? "block" : "invisible"
              }`}>
              <ul className="flex flex-col gap-4 items-center cursor-pointer">
                <li onClick={() => router.push("/account")}>Account</li>
                <li onClick={() => router.push("/help")}>Help</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {mobileNavbar ? (
        <div
          className={`mobile navbar lg:hidden bg-black z-50 text-white h-screen w-screen`}>
          <div
            className="block float-right mt-8 mr-8 text-2xl"
            onClick={() => setMobileNavbar(false)}>
            <RxCross1 />
          </div>
          <ul className="text-center pt-[50%] text-xl">
            <li className="mb-4">Home</li>
            <li onClick={() => router.push("/kids")} className="mb-4">
              Kids
            </li>
            <li onClick={() => router.push("/mylist")} className="mb-4">
              My List
            </li>
            <li onClick={() => router.push("/popular")} className="mb-4">
              New & Popular
            </li>
            <li onClick={() => router.push("/browse")} className="mb-4">
              Browse
            </li>
          </ul>
        </div>
      ) : (
        <>
          <nav className="flex justify-between items-center py-4 sm:py-16 ml-6 md:ml-0 lg:ml-20 lg:gap-0 md:gap-0 gap-8 sm:pr-20 bg-darkBg z-[100] relative">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src={"/images/play.svg"}
                  height={20}
                  width={20}
                  className="h-[13px] sm:h-[16px] w-[11px] sm:w-[16px]"
                  alt="play"
                />
                <p className="font-inter font-medium font10-18 ml-2 text-white w-[98px] md:w-auto whitespace-nowrap pr-4">
                  Video On Demand
                </p>
              </div>
            </Link>
            <div className="text-white md:mr-36 lg:mr-0 font-poppins font10-18 sm:ml-8 pr-4">
              <ul className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
                <li>
                  <Link href="/home">Home</Link>
                </li>
                <li className="lg:flex md:hidden hidden">
                  <Link href="/kids">Kids</Link>
                </li>
                <li className="lg:flex md:hidden hidden">
                  <Link href="/mylist">My List</Link>
                </li>
                <li className="lg:flex md:hidden hidden">
                  <Link href="/popular">New & Popular</Link>
                </li>
                <li className="lg:flex md:hidden hidden">
                  <Link href="/browse">Browse</Link>
                </li>
                <li
                  className="lg:block md:hidden hidden cursor-pointer"
                  onClick={() => setShowOptions(!showOptions)}>
                  <MdKeyboardArrowDown
                    className={`${
                      showOptions
                        ? "rotate-180 transition-all"
                        : " rotate-0 transition-all"
                    }`}
                  />
                </li>
              </ul>
            </div>
            <div className="text-white lg:text-3xl md:text-[22px] text-[15px] mr-4 sm:mr-20 md:mr-0">
              <ul className="flex gap-4 sm:gap-2 xl:gap-4 items-center">
                <li>
                  {/* <BiSearch className="sm:hidden" /> */}
                  {showSearchBar ? (
                    <ExpandibleSearchBar
                      handleBackClick={handleBackClick}
                      showSearchBar={showSearchBar}
                    />
                  ) : (
                    <BiSearch
                      className="sm:hidden"
                      onClick={() => {
                        setShowSearchBar(!showSearchBar);
                      }}
                    />
                  )}
                </li>
                <li className="lg:block md:block hidden">
                  <AiOutlineBell />
                </li>
                <li>
                  <Link href="/profile">
                    <img
                      src={
                        profileDataFromReducer.user[0]
                          ? images[profileDataFromReducer.user[0].avatarIndex]
                              .src
                          : "/images/femaleAvatar.svg"
                      }
                      alt="image"
                      className="block lg:w-[30px] lg:h-[30px] md:w-[22px] md:h-[22px] w-[15px] h-[15px] rounded-[50px]"
                    />
                  </Link>
                </li>
                <li
                  className="lg:block md:hidden hidden cursor-pointer"
                  onClick={() => setShowOptions(!showOptions)}>
                  <MdKeyboardArrowDown
                    className={`${
                      showOptions
                        ? "rotate-180 transition-all"
                        : " rotate-0 transition-all"
                    }`}
                  />
                </li>
              </ul>
            </div>
          </nav>
          <div
            className={`bg-black text-white font-poppins w-32 h-32 float-right relative left-[-1rem] top-[-1rem] pt-5  ${
              showOptions ? "block" : "invisible"
            }`}>
            <ul className="flex flex-col gap-4 items-center cursor-pointer">
              <li onClick={() => router.push("/account")}>Account</li>
              <li onClick={() => router.push("/help")}>Help</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
