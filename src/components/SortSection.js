import React, { useState } from "react";

const SortSection = ({ showPreference, showSortBy }) => {
  const [preferences, setPreferences] = useState({
    OriginalLanguage: "originalLanguages",
    language: "english",
    Sort: "mostLiked",
  });

  const { OriginalLanguage, language, Sort } = preferences;

  const handleOriginalLanguage = (event) =>
    setPreferences({ ...preferences, OriginalLanguage: event.target.value });

  const handleLanguage = (event) =>
    setPreferences({ ...preferences, language: event.target.value });

  const handleSort = (event) =>
    setPreferences({ ...preferences, Sort: event.target.value });

  return (
    <div className="flex flex-wrap sm:justify-between items-end md:items-center py-4 sm:py-12 mx-4 md:mx-8 lg:mx-20 gap-4">
      <div
        className={`text-white flex flex-col md:flex-row justify-between md:items-center gap-4 lg:gap-8 ${
          showPreference ? "" : "hidden"
        }`}>
        <p className="whitespace-nowrap font14-22 font-medium">
          Set your preferences
        </p>
        <div className="flex justify-between items-center gap-4 lg:gap-8">
          <div className="w-[160px] sm:w-[193px] h-[33px] sm:h-[41px]">
            <select
              className="w-full h-full px-2 text-white opacity-70 font-poppins font-normal bg-transparent text-[12px] sm:text-[14px] outline-none border border-white"
              style={{ marginTop: "0" }}
              id="language"
              value={OriginalLanguage}
              onChange={handleOriginalLanguage}>
              <option value="originalLanguages">Original Languages</option>
              <option value="hindi">Hindi</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </select>
            {/* <p>{`You selected ${OriginalLanguage}`}</p> */}
          </div>
          <div className="w-[113px] sm:w-[136px] h-[33px] sm:h-[41px]">
            <select
              className="w-full h-full px-2 text-white opacity-70 font-poppins font-normal bg-transparent text-[12px] sm:text-[14px] outline-none border border-white"
              style={{ marginTop: "0" }}
              id="languages"
              value={language}
              onChange={handleLanguage}>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
            </select>
            {/* <p>{`You selected ${language}`}</p> */}
          </div>
        </div>
      </div>
      <div>{/* Empty div for sortBy position to the right end */}</div>
      <div
        className={`text-white flex justify-between items-center gap-4 lg:gap-8 ${
          showSortBy ? "" : "hidden"
        }`}>
        <p className="whitespace-nowrap text-[14px] sm:text-[15px] font-normal">
          Sort By
        </p>
        <div className="w-[100px] sm:w-[136px] h-[33px] sm:h-[41px]">
          <select
            className="w-full h-full px-2 text-white opacity-70 font-poppins font-normal bg-transparent text-[12px] sm:text-[14px] outline-none border border-white"
            style={{ marginTop: "0" }}
            id="sortBy"
            value={Sort}
            onChange={handleSort}>
            <option value="mostLiked">Most Liked</option>
            <option value="Popular">Popular</option>
            <option value="topRated">Top Rated</option>
          </select>
          {/* <p>{`You selected ${Sort}`}</p> */}
        </div>
      </div>
    </div>
  );
};

export default SortSection;
