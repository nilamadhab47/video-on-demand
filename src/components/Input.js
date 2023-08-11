import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({
  type,
  placeholder,
  value,
  handleChange,
  min,
  title,
  id,
  errorMsg,
  hideShowStyle,
  inputStyles,
}) => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <>
      <div>
        <input
          type={type === "password" ? passwordType : type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          min={min}
          title={title}
          id={id}
          className={`p-3 text-black rounded text-sm placeholder-placeHolderTxt outline-none ${inputStyles}`}
        />
        <p
          className="text-sm font-poppins font-semi text-red-400"
          style={{ margin: 0, marginTop: "3px" }}>
          {errorMsg}
        </p>
        {type === "password" && (
          <button
            onClick={togglePasswordVisibility}
            type="button"
            className={`relative text-black ${hideShowStyle} hidebtn`}
            style={{}}>
            {passwordType === "password" ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
    </>
  );
};

export default Input;
