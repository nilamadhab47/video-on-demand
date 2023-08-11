/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        darkBg: "#1A1919",
        lightPinkTxt: "#FFE9E9",
        offWhiteTxt: "#FFFEFE",
        placeHolderTxt: "#999999",
        dialogBg: "#1C1C1C",
        dialogSubTxt: "#858181",
        btnLight: "#686767",
        btnDark: "#373737",
        addNewProfileTxt: "#212121",
        footerBg: "#188CFF",
        copyright: "#D0DAF5",
        yellowTxt: "#FFD233",
        btnHover1: "#9A56F6",
        btnHover2: "#6C41F6",
        HrBg: "#5C5C5C",
        AvatarModalBg: "#181818",
        AvatarModalBorder: "#999999",
        changeEmailtext: "#FFD233",
        FooterBg: "#192a3b",
        HelpLink: "#959494",
        homeBtn: "#272727",
        movieBtn: "#BDBDBD",
        movieBg: "#1A1919",
        hoverBg: "#252525",
      },
      fontSize: {
        l: "16px",
      },
    },
  },
  plugins: [],
};
