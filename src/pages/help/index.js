import React, { useState } from "react";

import Head from "next/head";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AlertModal from "@/components/AlertModal";

export default function Help() {
  const [isOpen, setIsOpen] = useState(false);
  const [manageProfileClicked, setManageProfileClicked] = useState(false);
  const togglemanageProfile = () => {
    setManageProfileClicked(!manageProfileClicked);
  };
  return (
    <>
      <Head>
        <title>Help</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen sm:h-[120vh] md:h-[85vh] lg:h-[110vh] xl:h-screen bg-darkBg text-offWhiteTxt">
        <Navbar />
        {isOpen && (
          <AlertModal
            setIsOpen={setIsOpen}
            displayText={
              "Your details have been sent. Our team will contact you shortly."
            }
          />
        )}
        <section className="absolute h-fit top-[10%] sm:top-[20%] flex ml-6 sm:ml-20 w-5/6 max-w-screen-lg">
          {/* <h3 className="font-semibold font-poppins font20-30 pb-8">
            Help Center
          </h3> */}
          <div className=" absolute lg:left-[10%] w-full lg:w-11/12 flex flex-col items-center sm:items-stretch gap-0 sm:gap-2 ">
            <h3 className="relative font-semibold font-poppins font20-30 pb-8 -left-20 sm:left-0 lg:-left-20">
              Help Center
            </h3>
            <p className="relative font-semibold font20-26 mb-4 -left-12 sm:left-0">
              Write Us Your Query
            </p>

            <div className="flex flex-col sm:flex-row items-start justify-between ">
              <div className="flex flex-col">
                <p className="font14-22 font-normal mb-4">Phone no:</p>
                <div className="flex gap-2 mb-4">
                  <select
                    className="p-3 text-black rounded text-sm outline-none"
                    style={{
                      marginTop: "0",
                      borderRight: "17px solid transparent",
                    }}>
                    <option value="india">Ind</option>
                  </select>
                  <Input
                    type="text"
                    placeholder="+91 Enter Your Number"
                    hideShowStyle={`left-[90%] top-[-2rem]`}
                    inputStyles="w-full h-full"
                  />
                </div>
                <p className="font14-22 font-normal mb-4">Your Message</p>
                <form>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    cols="60"
                    maxLength={150}
                    className="rounded text-black p-2 h-[108.11px] w-[284px] md:w-[318px] lg:w-[352px] sm:h-[134px] shrink"></textarea>
                </form>
                <p className="flex justify-end mb-4 text-[8px] sm:text-[10px]">
                  150/0 character
                </p>
                <Button
                  text="Submit"
                  type="submit"
                  btnStyle="w-[100%] h-[49px] bg-btnDark text-[16px]"
                  handleClick={() => setIsOpen(true)}
                />
              </div>
              <div className="flex sm:hidden flex-col w-[284px] sm:w-[355px] text-center flex-wrap">
                <p className="text-[14px] font-normal my-2 px-1 sm:px-4">or</p>
              </div>
              <div className="flex flex-col w-[284px] sm:w-[355px] text-center pl-0 sm:pl-16 lg:pl-0">
                <p className="font14-22 font-normal mb-4 sm:mb-8">
                  Write us at{" "}
                  <span className="text-HelpLink">VOD@gmail.com</span> below and
                  our team will contact you shortly
                </p>
                <button className="w-full h-[45.25px] sm:h-[54px] bg-center m-auto bg-btnLight hover:bg-gradient-to-r from-btnHover1 to-btnHover2 text-white p-3 rounded flex items-center justify-center gap-4 shrink">
                  <Image
                    src={"/images/mail.svg"}
                    width={20}
                    height={20}
                    className="h-[20px] w-[20px]"
                    alt="mail"
                  />
                  <p>Write to Us</p>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
