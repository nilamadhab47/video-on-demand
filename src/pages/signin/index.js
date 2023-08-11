import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { appsApi } from "@/utils/api";

import { alertModalRef } from "@/components/ModalProvider";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageLoader from "@/components/PageLoader";
import AuthGuard from "@/components/AuthGuard";

const SignIn = () => {
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("token");
  //   if (accessToken) {
  //     router.replace("/home");
  //     return;
  //   }
  //   setIsSubmit(false);
  // }, []);
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setDisabled(false);
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

    const formData = {
      email: registerFormData.email,
      password: registerFormData.password,
    };
    const errors = validateForm(registerFormData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    // api
    try {
      setIsSubmit(true);
      setDisabled(false);
      setLoading(true);

      const res = await appsApi.post("/auth/login", JSON.stringify(formData));
      console.log(res);
      // extract token and user from response
      const {
        access: { token },
      } = res.data.tokens;
      const user = res.data.user;
      // console.log(user);
      // console.log("token" + token);

      // store token and user in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // alertModalRef.current.openModal("Redirecting to Home Page");
      router.replace("/home");
      // setTimeout(() => {
      //   router.replace("/home");
      // }, 3000);
    } catch (error) {
      setLoading(false);
      console.log({ error });
      setDisabled(true);
      // setRegisterFormData({
      //   email: "",
      //   password: "",
      // });
      alertModalRef.current.openModal(`${error.response.data.message}`);
    } finally {
      setIsSubmit(false);
    }

    console.log({ data: registerFormData });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    } else {
      // Remove the error message if the email field has a valid value
      delete errors.email;
    }

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

    return errors;
  };
  return (
    <>
      <Layout>
        <div className="bg-dialogBg text-white w-[412px] rounded font-poppins mt-12">
          <h1 className="font16-28 mt-9 ml-8">Sign In</h1>
          <p className="ml-8 mt-2 font12-18">
            Enter a password and start exploring
          </p>

          <form className="mt-9 mr-8 space-y-4 ml-8" onSubmit={handleSubmit}>
            <Input
              type="email"
              id="email"
              value={registerFormData.email}
              placeholder="Enter Email"
              handleChange={handleChange}
              errorMsg={formErrors.email}
              hideShowStyle={"left-[90%]"}
              inputStyles="w-full"
            />

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                min={8}
                id="password"
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
                value={registerFormData.password}
              />
            </div>
            <div className="flex justify-between">
              <div className="text-xs text-dialogSubTxt flex gap-2 items-center">
                <Checkbox
                  checkboxLabel="Remember me"
                  checkboxlabelStyle={{ paddingLeft: "26px" }}
                />
              </div>
              <Link href="/signin/forgotpassword">
                <span className="text-xs text-white hover:underline hover:underline-offset-2 cursor-pointer">
                  Forgot Password
                </span>
              </Link>
            </div>
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
                btnStyle="w-full bg-btnLight lg:text-sm md:text-sm text-[10px]"
                handleClick={handleSubmit}
              />
            )}

            <p className="md:text-sm text-[9px] text-dialogSubTxt">
              New to Video On Demand?
              <Link href="/register" className="text-white">
                {" "}
                Register Now.
              </Link>
            </p>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default SignIn;
