import React, { useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";

import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import AlertModal from "@/components/AlertModal";
import { alertModalRef } from "@/components/ModalProvider";
import { useRouter } from "next/router";
import { appsApi } from "@/utils/api";
import Link from "next/link";

export default function EditPassword() {
  const router = useRouter();
  const { token } = router.query;
  const handleOpenModal = () => {
    alertModalRef.current.openModal(
      "Your New password has been successfully updated",
    );
  };
  const [registerFormData, setRegisterFormData] = useState({
    password: "",
    rePassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.id]: e.target.value,
    });
    console.log(registerFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(registerFormData));
    setIsSubmit(true);
    const resetPasswordPost = await appsApi.post(
      "auth/reset-password/",
      registerFormData,
      {
        token,
      },
    );
    console.log(resetPasswordPost);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(registerFormData);
    }
  }, [formErrors]);
  const validateForm = (values) => {
    const errors = {};
    // const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    if (!values.password) {
      errors.password = "password is required";
    }
    if (!values.rePassword) {
      errors.rePassword = "Re-Enter password is required";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = "Your password does not match";
    }
    return errors;
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Reset Password</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-darkBg text-offWhiteTxt">
        <section className="absolute top-[13%] sm:top-[25%] px-[2%] sm:px-0 sm:ml-[8%] md:ml-[20%] w-11/12 sm:w-10/12 md:w-3/5 flex flex-col justify-start items-center md:items-start mx-2 gap-4 flex-wrap shrink overflow-hidden">
          <div className="flex gap-4 sm:gap-8 items-baseline mb-0 sm:mb-4">
            <Link href="/signin">
              <Image
                src={"/images/leftArrow.svg"}
                width={26}
                height={20}
                alt="left Arrow"
              />
            </Link>
            <h3 className="font-semibold font-poppins font20-30 pb-4 sm:pb-8 whitespace-nowrap">
              Reset Password
            </h3>
          </div>
          <form className="flex flex-col gap-2 sm:gap-0 w-auto sm:w-4/6 md:w-4/5 justify-center shrink">
            <div className="flex gap-2 flex-col sm:flex-row justify-between mb-0 sm:mb-4">
              <p className="whitespace-nowrap w-[295px]">New Password:</p>
              <div className="w-[284px] sm:w-[352px]">
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter new Password"
                  handleChange={handleChange}
                  errorMsg={formErrors.password}
                  hideShowStyle={`left-[90%] ${
                    formErrors.password ? "top-[-3.3rem]" : "top-[-2rem]"
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
                <Button
                  text="Submit"
                  type="submit"
                  btnStyle="w-[100%] h-[44px] bg-btnDark text-[16px]"
                  handleClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
