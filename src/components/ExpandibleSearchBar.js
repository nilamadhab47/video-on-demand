// import React from "react";
// import { BiSearch } from "react-icons/bi";

// const ExpandibleSearchBar = ({ handleChange, handleSubmit }) => {
//   return (
//     <div className="hidden sm:block relative rounded-2xl bg-transparent shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-md ">
//       <form
//         action=""
//         className="relative mx-auto w-max"
//         onSubmit={handleSubmit}>
//         <input
//           onChange={handleChange}
//           type="search"
//           className="peer text-[16px] cursor-pointer relative z-10 h-8 focus:h-10 lg:focus:h-10 w-8 rounded-lg border border-transparent bg-transparent pl-10 outline-none focus:w-full focus:cursor-text focus:border-white lg:focus:pr-4"
//         />
//         <BiSearch className="absolute inset-y-0 my-auto h-4 sm:h-8 w-12 border-r border-transparent sm:py-1 lg:py-0 lg:pt-1 px-2 peer-focus:stroke-white" />
//       </form>
//     </div>
//   );
// };

// export default ExpandibleSearchBar;

/*=============================================
=            alternative search Bar            =
=============================================*/

// import useMoviesData from "@/hooks/movieData";
// import React, { useState } from "react";
// import ReactSelect from "react-select";
// import { BiSearch } from "react-icons/bi";

// const ExpandibleSearchBar = ({ handleSubmit }) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   const data = useMoviesData();

//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     setSelectedMovie(inputValue);
//   };

//   const handleInputChange = (inputValue) => {
//     const filteredMovies = data.filter((movie) =>
//       movie.data.some((movieData) =>
//         movieData.title.toLowerCase().includes(inputValue.toLowerCase()),
//       ),
//     );

//     const mappedSuggestions = filteredMovies.map((movie) => ({
//       value: movie.data[0].title,
//       label: movie.data[0].title,
//     }));

//     setSuggestions(mappedSuggestions);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       handleSubmit();
//     }
//   };

//   return (
//     <div className="relative rounded-2xl bg-transparent shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-md">
//       <form className="relative mx-auto w-max" onSubmit={handleSubmit}>
//         <input
//           onChange={(e) => handleInputChange(e.target.value)}
//           onKeyDown={handleKeyDown}
//           type="search"
//           className="peer text-[16px] cursor-pointer relative z-10 h-8 focus:h-10 lg:focus:h-10 w-8 rounded-lg border border-transparent bg-transparent pl-10 outline-none focus:w-full focus:cursor-text focus:border-white lg:focus:pr-4"
//           placeholder="Search for a movie..."
//         />
//         <button
//           type="submit"
//           className="absolute inset-y-0 my-auto h-4 sm:h-8 w-12 border-r border-transparent sm:py-1 lg:py-0 lg:pt-1 px-2 peer-focus:stroke-white">
//           <BiSearch />
//         </button>
//       </form>
//       <ul className="suggestions">
//         {suggestions.map((option) => (
//           <li
//             key={option.value}
//             onClick={() => setSelectedMovie(option.label)}
//             className={`option ${
//               selectedMovie === option.value ? "selected" : ""
//             }`}>
//             {option.label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ExpandibleSearchBar;

/*=============================================
=            3rd method                       =
=============================================*/
import useMoviesData from "@/hooks/movieData";
import React, { useState } from "react";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect } from "react";

const ExpandibleSearchBar = ({ handleBackClick, showSearchBar }) => {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(false);

  const data = useMoviesData();
  const inputRef = useRef(null);
  const searchBarRef = useRef();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSelectedMovie(inputValue);
    handleSearchChange(e); // Call the additional handleChange function
  };

  const handleInputChange = (inputValue) => {
    const filteredMovies = data.filter((movie) =>
      movie.data.some((movieData) =>
        movieData.title.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    );

    const uniqueSuggestions = new Set();
    const mappedSuggestions = filteredMovies.flatMap((movie) =>
      movie.data
        .map((movieData) => movieData.title)
        .filter((title) => {
          if (!uniqueSuggestions.has(title)) {
            uniqueSuggestions.add(title);
            return true;
          }
          return false;
        }),
    );

    setSuggestions(
      mappedSuggestions
        .filter((title) =>
          title.toLowerCase().includes(inputValue.toLowerCase()),
        )
        .map((title) => ({
          value: title,
          label: title,
        })),
    );

    if (inputValue === "") {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit(); // Call the additional handleSearchSubmit function
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSuggestionClick = (suggestion) => {
    const selectedMovieLabel = suggestion.label;
    setSelectedMovie(selectedMovieLabel);
    setSearchQuery(selectedMovieLabel);
    setSuggestions([]);
    inputRef.current.blur(); // Remove focus from the input field
    handleSearchSubmit(selectedMovieLabel); // Pass the selected movie label as an argument
  };

  const handleSearchSubmit = (selectedMovieLabel) => {
    const query = selectedMovieLabel || searchQuery;

    if (query.trim() !== "") {
      router.push({
        pathname: "/searchedMovie",
        query: { query },
      });
    }
  };
  useEffect(() => {
    if (selectedMovie && inputRef.current) {
      const movieNameWidth = selectedMovie.length * 9; // Adjust the width factor as per your requirement
      const minWidth = 300; // Adjust the initial width as per your requirement
      const inputWidth = Math.max(movieNameWidth, minWidth);
      inputRef.current.style.width = `${inputWidth}px`;
    }
  }, [selectedMovie]);

  useEffect(() => {
    if (!selectedMovie && inputRef.current) {
      inputRef.current.style.width = "300px"; // Set the original width when the input is empty
    }
  }, [selectedMovie]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 backdrop-filter backdrop-blur-lg">
        <div className="relative rounded-2xl bg-transparent shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-md p-4">
          <form className="relative" onSubmit={handleSearchSubmit}>
            <div className="flex items-center justify-between">
              <button type="button" className="mr-2" onClick={handleBackClick}>
                <BiArrowBack className="text-white text-2xl" />
              </button>
              <input
                onChange={(e) => {
                  handleChange(e);
                  handleSearchChange(e);
                  handleInputChange(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                type="search"
                className="peer text-[16px] relative z-10 h-10 rounded-lg border border-transparent bg-transparent pl-10 outline-none cursor-text"
                placeholder="Search for a movie..."
                value={selectedMovie}
              />
            </div>
            <button
              type="submit"
              className="absolute inset-y-0 my-auto h-4 sm:h-8 w-12 border-r border-transparent sm:py-1 lg:py-0 lg:pt-1 px-2 right-2 top-2">
              <BiSearch className="text-white" />
            </button>
            {suggestions.length > 0 && (
              <ul className="suggestions absolute left-0 w-full mt-2 max-h-48 overflow-y-auto bg-black bg-opacity-75 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-lg shadow-md text-l">
                {suggestions.slice(0, 10).map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleSuggestionClick(option)}
                    className={`option ${
                      selectedMovie === option.label ? "selected" : ""
                    } py-2 px-4 cursor-pointer hover:bg-gray-600`}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
      </div>

      <div
        className="hidden md:block relative rounded-2xl bg-transparent shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-md left-[-3rem]"
        ref={searchBarRef}>
        <form className="relative mx-auto w-max" onSubmit={handleSearchSubmit}>
          <input
            ref={inputRef}
            onChange={(e) => {
              handleChange(e);
              handleSearchChange(e);
              handleInputChange(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="search"
            className="peer text-[16px] relative z-10 h-10 rounded-lg border border-transparent bg-transparent pl-10 outline-none w-full cursor-text"
            placeholder="Search for a movie..."
            value={selectedMovie}
          />
          <button
            type="submit"
            className="absolute inset-y-0 my-auto h-4 sm:h-8 w-12 border-r border-transparent sm:py-1 lg:py-0 lg:pt-1 px-2">
            <BiSearch />
          </button>
          {suggestions.length > 0 && (
            <ul className="suggestions absolute left-0 w-full mt-2 max-h-48 overflow-y-auto bg-black bg-opacity-75 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-lg shadow-md text-l">
              {suggestions.slice(0, 10).map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSuggestionClick(option)}
                  className={`option ${
                    selectedMovie === option.label ? "selected" : ""
                  } py-2 px-4 cursor-pointer hover:bg-gray-600`}>
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </>
  );
};
export default ExpandibleSearchBar;

/*=============================================
=            4th method                        =
=============================================*/

// import useMoviesData from "@/hooks/movieData";
// import ReactSelect from "react-select";
// import { BiSearch } from "react-icons/bi";

// import { useRouter } from "next/router";
// import { useState, useRef, useEffect } from "react";

// const ExpandibleSearchBar = () => {
//   const router = useRouter();
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(true);
//   const inputRef = useRef(null);

//   const data = useMoviesData();

//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     setSelectedMovie(inputValue);
//     handleSearchChange(e); // Call the additional handleChange function
//   };

//   const handleInputChange = (inputValue) => {
//     const filteredMovies = data.filter((movie) =>
//       movie.data.some((movieData) =>
//         movieData.title.toLowerCase().includes(inputValue.toLowerCase()),
//       ),
//     );

//     const uniqueTitles = new Set();
//     const mappedSuggestions = filteredMovies
//       .map((movie) => movie.data[0].title)
//       .filter((title) => {
//         if (!uniqueTitles.has(title)) {
//           uniqueTitles.add(title);
//           return true;
//         }
//         return false;
//       })
//       .map((title) => ({
//         value: title,
//         label: title,
//       }));

//     setSuggestions(mappedSuggestions);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       handleSearchSubmit(event); // Call the additional handleSearchSubmit function
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       router.push({
//         pathname: "/searchedMovie",
//         query: { query: searchQuery },
//       });
//     }
//   };
//   const handleSuggestionClick = (suggestion) => {
//     setSelectedMovie(suggestion.label);
//     setSearchQuery(suggestion.label);
//     setShowSuggestions(false); // Hide the suggestion box after a suggestion is clicked
//   };
//   const handleBlur = () => {
//     setShowSuggestions(false); // Hide the suggestion box when the input field loses focus
//   };

//   useEffect(() => {
//     if (selectedMovie) {
//       inputRef.current.focus(); // Focus on the input field when selectedMovie changes
//     }
//   }, [selectedMovie]);

//   return (
//     <div className="relative rounded-2xl bg-transparent shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-md">
//       <form className="relative mx-auto w-max" onSubmit={handleSearchSubmit}>
//         <input
//           ref={inputRef}
//           onChange={(e) => {
//             handleChange(e);
//             handleSearchChange(e);
//             handleInputChange(e.target.value); // Update suggestions on input change
//             setShowSuggestions(true); // Show the suggestion box on input change
//           }}
//           onBlur={handleBlur}
//           onKeyDown={handleKeyDown}
//           type="search"
//           className="peer text-[16px]  relative z-10 h-8  lg:focus:h-10 rounded-lg border border-transparent bg-transparent pl-10 outline-none w-full cursor-text focus:border-white lg:focus:pr-4"
//           placeholder="Search for a movie..."
//           value={selectedMovie}
//         />
//         <button
//           type="submit"
//           className="absolute inset-y-0 my-auto h-4 sm:h-8 w-12 border-r border-transparent sm:py-1 lg:py-0 lg:pt-1 px-2">
//           <BiSearch />
//         </button>
//       </form>
//       {showSuggestions && suggestions.length > 0 && (
//         <ul className="suggestions">
//           {suggestions.map((option) => (
//             <li
//               key={option.value}
//               onClick={() => handleSuggestionClick(option)}
//               className={`cursor-pointer option ${
//                 selectedMovie === option.label ? "selected" : ""
//               }`}>
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ExpandibleSearchBar;
