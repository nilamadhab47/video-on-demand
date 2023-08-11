import Input from "@/components/Input";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const index = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const handleGetStarted = () => {
    if (validateEmail()) {
      // Email is valid, route to another page
      router.push(`/register?email=${encodeURIComponent(email)}`);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(true); // Reset validation state when input changes
  };

  return (
    <Layout>
      <div className="text-white font-poppins text-center lg:mt-60 md:mt-60 mt-12 ">
        <h1 className="mb-5 font16-60">VIDEO ON DEMAND</h1>
        <h2 className="mb-2 font14-24">Unlimited movies, Watch anywhere.</h2>
        <div className="flex justify-center gap-5 mt-8 lg:flex-row md:flex-row flex-col">
          <div>
            <input
              value={email}
              type="email"
              name="email"
              required
              placeholder="Enter email Id"
              className={`rounded-md px-3 lg:px-5 lg:py-4 md:px-5 md:py-4 py-[10px] active:outline-none font-normal text lg:w-[24rem] w-full text-black placeholder-placeHolderTxt outline-none ${
                !isEmailValid ? "border-red-500" : ""
              }`}
              onChange={handleInputChange}
            />
            {!isEmailValid && (
              <div className="flex items-center text-red-500">
                <p className="warning-text">
                  Please enter a valid email address.
                </p>
              </div>
            )}
          </div>

          <div
            onClick={handleGetStarted}
            className={`hover-3 cursor-pointer ${
              isEmailValid ? "" : "h-[3.7rem]"
            } text-offWhiteTxt w-[88%] lg:w-1/3 rounded-md flex justify-evenly items-center whitespace-nowrap bg-black gap-14 px-3 py-[10px] ml-4 ${
              isHovered ? "hovered" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <p>Get Started</p>
            <MdKeyboardArrowRight
              className={`text-3xl ${isHovered ? "rotate" : ""}`}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
