import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-orange-500 text-[#ffffff8e] h-[100vh]  flex flex-col justify-between  px-4 pt-3">
      <div className="text-white font-bold flex flex-row justify-between">
        <p>DStudio</p>
        <p>{new Date().toDateString()}</p>
      </div>
      <div className="md:w-1/2 lg:w-3/4 flex items-center ">
        <p className="text-[44px] leading-[38px] font-semibold lg:text-[70px] lg:leading-[65px]">
          Get ready to <span className="text-[#ffffff]">supercharge</span>{" "}
          <span className="text-[#ffffffe3]">your goal</span>-setting and
          planning with DStudio
        </p>
      </div>

      <Link
        className="bg-white text-gray-800 border-none p-3 mb-24 md:mb-20 lg:mb-52 rounded-3xl text-center sm:w-fit"
        to={"/login"}
      >
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
