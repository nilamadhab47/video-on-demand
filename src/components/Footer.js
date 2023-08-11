import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="block">
      <div className="flex justify-center items-center h-32 border-none text-white bg-FooterBg">
        <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
          <p>Home</p>
          <p>Kids</p>
          <p>My List</p>
          <p>New & Popular</p>
          <p>Browse</p>
        </div>
      </div>
      <div className="flex-col justify-center items-center space-y-8 h-52 text-white bg-darkBg">
        <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap pt-8">
          <p>Terms & Conditions</p>
          <p>About Us</p>
          <p>Privacy Policy</p>
          <p>Contact</p>
          <p>FAQ</p>
        </div>
        <div className="flex justify-around items-center border border-white rounded w-[169px] m-auto bg-darkBg">
          <Image
            src={"/images/Globe.svg"}
            height={20}
            width={20}
            className="ml-2"
            alt="globe"
          />
          <select
            className="p-3 text-white rounded text-sm outline-none bg-transparent"
            style={{ marginTop: "0", borderRight: "17px solid transparent" }}>
            <option value="male">English</option>
            <option value="male">Hindi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Footer;
