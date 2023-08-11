import React, { useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";

import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import AlertModal from "@/components/AlertModal";
import { alertModalRef } from "@/components/ModalProvider";
import { appsApi } from "@/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";

export default function EditPassword() {
  const router = useRouter();
  const handleOpenModal = () => {
    alertModalRef.current.openModal(
      "Your New password has been successfully updated",
    );
  };
  const [registerFormData, setRegisterFormData] = useState({
    newPassword: "",
    password: "",
    rePassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;

    // setRegisterFormData({ ...registerFormData, [e.target.id]: e.target.value });
    // setFormErrors(validateForm(registerFormData));

    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
    console.log(registerFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(registerFormData));
    const { rePassword, ...changePassword } = registerFormData;

    setIsSubmit(true);
    try {
      setLoading(true);

      const res = await appsApi.put(
        "auth/change-password",
        JSON.stringify(changePassword),
      );
      console.log("change Password", res);
      router.push("/profile");
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
    console.log({ data: registerFormData });
  };

  const validateForm = (values) => {
    const errors = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!values.password) {
      errors.password = "Password is required";
    } else if (
      values.password.length > 0 &&
      !passwordRegex.test(values.password)
    ) {
      errors.password =
        "Password should be at least 8 characters long and contain at least 1 letter and 1 number";
    } else {
      delete errors.password;
    }
    if (!values.newPassword) {
      errors.newPassword = "Password is required";
    } else if (
      values.newPassword.length > 0 &&
      !passwordRegex.test(values.newPassword)
    ) {
      errors.newPassword =
        "Password should be at least 8 characters long and contain at least 1 letter and 1 number";
    } else {
      delete errors.newPassword;
    }

    if (!values.rePassword) {
      errors.rePassword = "Re Password is required";
    } else if (
      values.rePassword.length > 0 &&
      values.newPassword !== values.rePassword
    ) {
      errors.rePassword = "Make sure your password matches";
    } else {
      delete errors.rePassword;
    }
    return errors;
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Change Password</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[90vh] bg-darkBg text-offWhiteTxt">
        <Navbar />
        {/* <AlertModal
            ref={alertModalRef}
            displayText={"Your new Password has been successfully updated"}
          /> */}
        <section className="absolute top-[13%] sm:top-[25%] px-[2%] sm:px-0 sm:ml-[8%] md:ml-[20%] w-11/12 sm:w-10/12 md:w-3/5 flex flex-col justify-start items-center md:items-start mx-2 gap-4 flex-wrap shrink overflow-hidden">
          <div className="flex gap-4 sm:gap-8 items-baseline mb-0 sm:mb-4">
            <Link href={"/account"}>
              <Image
                src={"/images/leftArrow.svg"}
                width={26}
                height={20}
                alt="left Arrow"
              />
            </Link>
            <h3 className="font-semibold font-poppins font20-30 pb-4 sm:pb-8 whitespace-nowrap">
              Change Password
            </h3>
          </div>
          <form className="flex flex-col gap-2 sm:gap-0 w-auto sm:w-4/6 md:w-4/5 justify-center shrink">
            <div className="flex gap-2 flex-col sm:flex-row justify-between mb-0 sm:mb-4">
              <p className="whitespace-nowrap w-[295px]">Current Password:</p>
              <div className="w-[284px] sm:w-[352px]">
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter new Password"
                  handleChange={handleChange}
                  errorMsg={formErrors.password}
                  hideShowStyle={`left-[90%] ${
                    formErrors.password
                      ? formErrors.password === "Password is required"
                        ? "top-[-3.3rem]"
                        : "top-[-4.5rem]"
                      : "top-[-2rem]"
                  }`}
                  inputStyles="w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row justify-between mb-0 sm:mb-4">
              <p className="whitespace-nowrap w-[295px]">New Password:</p>
              <div className="w-[284px] sm:w-[352px]">
                <Input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new Password"
                  handleChange={handleChange}
                  errorMsg={formErrors.password}
                  hideShowStyle={`left-[90%] ${
                    formErrors.password
                      ? formErrors.password === "Password is required"
                        ? "top-[-3.3rem]"
                        : "top-[-4.5rem]"
                      : "top-[-2rem]"
                  }`}
                  inputStyles="w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row justify-between mb-0 sm:mb-4">
              <p className="whitespace-nowrap w-[295px]">Re-enter Password:</p>
              <div className="w-[284px] sm:w-[352px]">
                <Input
                  type="password"
                  placeholder="Re-enter new Password"
                  id="rePassword"
                  handleChange={handleChange}
                  errorMsg={formErrors.rePassword}
                  hideShowStyle={`left-[90%] ${
                    formErrors.rePassword ? "top-[-3.3rem]" : "top-[-2rem]"
                  }`}
                  inputStyles="w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row justify-between mb-0 sm:mb-4">
              <p className="whitespace-nowrap w-[295px]"></p>
              <div className="w-[284px] sm:w-[352px]">
                {loading ? (
                  <button
                    type="button"
                    className="w-full h-[49px] bg-btnLight lg:text-sm md:text-sm text-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled>
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status">
                      <span className="!absolute !-m-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  </button>
                ) : (
                  <Button
                    text="Submit"
                    type="submit"
                    btnStyle="w-[100%] h-[44px] bg-btnDark text-[16px]"
                    handleClick={handleSubmit}
                  />
                )}
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
