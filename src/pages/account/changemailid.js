import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { alertModalRef } from "@/components/ModalProvider";
import { appsApi } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData } from "@/store/slices/profileSlice";
import { useRouter } from "next/router";
export default function EditEmail() {
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchProfile = () => {
    dispatch(fetchProfileData);
  };
  const profileDataFromReducer = useSelector((state) => {
    console.log("state..", state.profileData);
    console.log("state.. user[0]", state.profileData.user[0]);
    if (state.profileData.user && state.profileData.user.length > 0) {
      console.log("state.. username", state.profileData.user[0].username);
    }

    return state.profileData;
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleOpenModal = () => {
    alertModalRef.current.openModal(
      "Your New mail Id has been successfully updated",
    );
  };

  // const handleCloseModal = () => {
  //   alertModalRef.current.closeModal();
  // };
  const [registerFormData, setRegisterFormData] = useState({
    newEmail: "",
    email: "",
    reEmail: "",
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
    const errors = validateForm(registerFormData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    const { reEmail, ...changeEmail } = registerFormData;
    setIsSubmit(true);
    try {
      setLoading(true);

      const res = await appsApi.put(
        "auth/change-email",
        JSON.stringify(changeEmail),
      );
      console.log("chang email id", res);
      router.push("/account");
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
    console.log({ data: registerFormData });
  };
  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(registerFormData);
  //   }
  // }, [formErrors]);
  const validateForm = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    } else {
      // Remove the error message if the email field has a valid value
      delete errors.email;
    }
    if (!values.newEmail) {
      errors.newEmail = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.newEmail = "Invalid email format";
    } else {
      // Remove the error message if the email field has a valid value
      delete errors.newEmail;
    }
    if (!values.reEmail) {
      errors.reEmail = "Re-Enter email is required";
    } else if (values.newEmail !== values.reEmail) {
      errors.reEmail = "Your email does not match";
    }
    return errors;
  };
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Change email ID</title>
        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[90vh] bg-darkBg text-offWhiteTxt">
        <Navbar />
        {/* <AlertModal
            ref={alertModalRef}
            displayText={"Your new Email Address has been successfully updated"}
          /> */}
        <section className="absolute top-[13%] sm:top-[25%] px-[2%] sm:px-0 sm:ml-[8%] md:ml-[20%] w-11/12 sm:w-10/12 md:w-3/5 flex flex-col justify-start items-center md:items-start mx-2 gap-4 flex-wrap shrink overflow-hidden">
          <div className="flex gap-4 sm:gap-8 items-baseline justify-start mb-0 sm:mb-4">
            <Image
              src={"/images/leftArrow.svg"}
              width={26}
              height={20}
              alt="left Arrow"
            />
            <h3 className="font-semibold font-poppins font20-30 pb-4 sm:pb-8 whitespace-nowrap sm:whitespace-normal">
              Change email Address
            </h3>
          </div>
          <form
            className="flex flex-col gap-2 sm:gap-0 w-auto sm:w-4/6 md:w-4/5 justify-center shrink"
            onSubmit={handleSubmit}>
            <div className="flex gap-2 flex-col sm:flex-row justify-between mb-8">
              <p className="whitespace-nowrap w-[295px]">
                Current email address:
              </p>
              <div className="w-[284px] sm:w-[352px]">
                <Input
                  type="text"
                  placeholder="Enter Email"
                  id="email"
                  inputStyles="w-full"
                  handleChange={handleChange}
                  errorMsg={formErrors.email}
                  hideShowStyle={`right-[90%] ${
                    formErrors.email ? "top-[-3.3rem]" : "top-[-2rem]"
                  }`}
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row justify-between mb-8">
              <p className="whitespace-nowrap w-[295px]">New email address:</p>
              <div className="w-[284px] sm:w-[352px]">
                <Input
                  type="email"
                  placeholder="Enter New Email Address"
                  id="newEmail"
                  handleChange={handleChange}
                  errorMsg={formErrors.newEmail}
                  hideShowStyle={`right-[90%] ${
                    formErrors.newEmail ? "top-[-3.3rem]" : "top-[-2rem]"
                  }`}
                  inputStyles="w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row justify-between mb-8">
              <p className="whitespace-nowrap w-[295px]">
                Re-enter email address:
              </p>
              <div className="w-[284px] sm:w-[352px]">
                <Input
                  type="email"
                  placeholder="Re-enter New Email Address"
                  id="reEmail"
                  handleChange={handleChange}
                  errorMsg={formErrors.reEmail}
                  hideShowStyle={`left-[90%] ${
                    formErrors.reEmail ? "top-[-3.3rem]" : "top-[-2rem]"
                  }`}
                  inputStyles="w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row justify-between mb-8">
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
