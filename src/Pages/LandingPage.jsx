import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-orange-500 text-[#ffffff8e] h-[100vh] flex flex-col justify-between px-4 pt-3">
      <div className="text-white font-bold flex flex-row justify-between">
        <p>DStudio</p>
        <p>{new Date().toDateString()}</p>
      </div>
      <div className="">
        <p className="text-[44px] leading-[38px] font-semibold">
          Get ready to <span className="text-[#ffffff]">supercharge</span>{" "}
          <span className="text-[#ffffffe3]">your goal</span>-setting and
          planning with DStudio
        </p>
      </div>

      <Link
        className="bg-white text-gray-800 p-3 mb-24 rounded-3xl text-center"
        to={"/login"}
      >
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
