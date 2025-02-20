// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Priority = () => {
  return (
    <div className="flex flex-col gap-10 p-3">
      <Link to={"/home"} className="underline">
        Back to homepage
      </Link>
      <div className="border-solid border-2 border-gray-100 w-fit">
        <p className="bg-white text-gray-900 font-bold p-1">Today's tips</p>
        <ul className="p-1 list-disc pl-5">
          <li>Have some sun ☀️</li>
          <li>Exercise 🤸‍♂️</li>
          <li>Learn something new 📖</li>
        </ul>
      </div>
    </div>
  );
};

export default Priority;
