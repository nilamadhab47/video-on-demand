import React from "react";
import { BsCheck, BsClock, BsPlayCircle } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
const Button = ({
  text,
  handleClick,
  type,
  btnStyle,
  disabled,
  showTick,
  showText,
}) => {
  if (type === "submit") {
    return (
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={`
           hover:bg-gradient-to-r from-btnHover1 to-btnHover2 p-3 text-white rounded  ${btnStyle}`}>
        {text}
      </button>
    );
  } else if (text === "Watch Now") {
    return (
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={`
           ${btnStyle} hover:scale-105 transition-all`}>
        <BsPlayCircle /> {text}
      </button>
    );
  } else if (text === "Watch Later") {
    return (
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={`${btnStyle} relative`}
        style={{
          backgroundColor: showTick ? "black" : null,
          color: showTick ? "white" : null,
          transition: "background-color 0.3s, color 0.3s",
        }}>
        {showTick && (
          <div
            className={`flex items-center ${
              showTick ? "slide-out" : "slide-in"
            }`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="mr-1"
              style={{
                fill: "white",
                width: "1em",
                height: "1em",
              }}>
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
            <span
              style={{
                opacity: `${showTick ? "1" : "0"}`,
                transition: "opacity 0.3s",
                color: "white",
              }}>
              Added
            </span>
          </div>
        )}
        {!showTick && <span>{text}</span>}
      </button>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${btnStyle}`}>
      {text}
    </button>
  );
};

export default Button;
