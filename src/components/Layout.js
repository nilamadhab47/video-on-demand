import { whyYouShouldJoin } from "@/utils/mockData";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

export default function Layout({ children }) {
  const renderWhyYouShouldJoin = [
    ...whyYouShouldJoin.map((v, i) => {
      return (
        <div className={`flex items-center gap-5 font12-20 mt-10`} key={v.id}>
          <Image src={`${v.img}`} height={50} width={50} alt="v-img" />
          <p>{v.description}</p>
        </div>
      );
    }),
  ];
  return (
    <>
      <Head>
        <title>VOD</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[133vh] bg-[url('/images/background.svg')] bg-center bg-no-repeat bg-cover">
        <nav className="flex justify-between items-center lg:pt-16 md:pt-16 pt-8 lg:px-32 px-4">
          <div className="flex pt-3">
            <Image
              src={"/images/play.svg"}
              height={20}
              width={20}
              className="h-3 w-3 lg:h-5 lg:w-5 lg:mt-[5px] md:w-5 md:h-5 md:mt-[5px]"
              alt="play"
            />
            <p className="font-inter font-medium ml-2 text-white text-[10px] lg:text-lg md:text-lg">
              Video On Demand
            </p>
          </div>
          <div className="p-1 cursor-pointer">
            <Link
              className="font-poppins font-medium text-white text-[10px] lg:text-lg md:text-lg"
              href={`/signin`}>
              Sign In
            </Link>
          </div>
        </nav>
        <section className="lg:px-32 md:px-16 px-4 lg:mb-[16rem] md:mb-[16rem] mb-12 flex justify-center">
          {children}
        </section>
        <section className="bg-darkBg lg:py-20 md: lg:px-32 md:px-12 px-4">
          <Compatible
            imgFirst={false}
            heading={"Compatible with All devices"}
            description={
              "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more        ."
            }
            imgSrc={"/images/compatible.svg"}
          />
          <Compatible
            imgFirst={true}
            heading={"Easy sign-up"}
            description={
              "Sign-up in two clicks and access our catalogue immediately"
            }
            imgSrc={"/images/easy_signup.svg"}
          />
          <div className="text-white font-poppins lg:mt-60 mt-24">
            <h3 className="font-semibold font16-30 pb-2">
              Compatible with All Find out why thousands of people sign up
              daily.
            </h3>
            <p className="font-normal font12-16">
              It&apos;s HERE and it&apos;s FREE. Here&apos;s why you should join
              :
            </p>

            <div className="grid md:grid-cols-2 gap-x-60 font-poppins font-normal mt-10">
              {renderWhyYouShouldJoin}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const Compatible = (props) => {
  const { imgFirst, heading, description, imgSrc } = props;

  let c = `relative lg:w-1/2 w-full aspect-video bg-red-200 flex rounded-md overflow-hidden m-4`;
  if (!imgFirst) {
    c += " lg:ml-20";
  } else {
    c += " lg:mr-20";
  }
  const imgSection = (
    <div className={c}>
      <Image src={`${imgSrc}`} fill className="object-cover" alt="section" />
    </div>
  );
  const txtSection = (
    <div className="font-poppins text-white lg:w-1/2 w-full text-center md:text-left">
      <h3 className="font-semibold font16-48 py-4">{heading}</h3>
      <p className="font-normal font12-16 text-lightPinkTxt break-words">
        {description}
      </p>
    </div>
  );
  return (
    <>
      {imgFirst ? (
        <div className="flex lg:flex-row md:flex-row flex-col-reverse items-center justify-between lg:my-40 my-16">
          {imgSection}
          {txtSection}
        </div>
      ) : (
        <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between lg:my-40 my-16">
          {txtSection}
          {imgSection}
        </div>
      )}
    </>
  );
};
