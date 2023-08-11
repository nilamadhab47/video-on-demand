import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { appsApi } from "@/utils/api";

import { alertModalRef } from "@/components/ModalProvider";

const Forgotpassword = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setDisabled(false);
    const { id, value } = e.target;

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
    };
    const errors = validateForm(registerFormData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    // api
    try {
      setDisabled(false);
      setLoading(true);

      const res = await appsApi.post(
        "/auth/forgot-password",
        JSON.stringify(formData),
      );
      console.log(res);
      setIsSubmit(true);
      setLoading(false);
      // extract token and user from response
    } catch (error) {
      setLoading(false);
      console.log({ error });
      setDisabled(true);

      alertModalRef.current.openModal(`${error.response.data.message}`);
    } finally {
      setIsSubmit(true);
    }

    console.log({ data: registerFormData });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

    if (!values.email) {
      errors.email = "email is required";
    } else if (values.email.length > 0) {
      // Remove the error message if the email field has a value
      delete errors.email;
    }
    return errors;
  };

  return (
    <>
      <Layout>
        <div className="bg-dialogBg text-white h-[300px] w-[412px] rounded font-poppins mt-24">
          <h1 className="font16-28 mt-9 ml-8">Forget Password</h1>
          <p className="ml-8 mt-2 font12-18">Enter your Email address</p>

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
                text={isSubmit ? "Check your inbox" : "submit"}
                type="submit"
                btnStyle="w-full bg-btnLight lg:text-sm md:text-sm text-[10px]"
                handleClick={handleSubmit}
              />
            )}
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Forgotpassword;
