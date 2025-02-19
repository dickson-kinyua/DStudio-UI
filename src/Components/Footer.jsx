import React from "react";
import { Link } from "react-router-dom";

const FooterNav = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex flow-row items-center text-gray-700 justify-between p-2 font-semibold h-[7vh] sm:h-fit z-20">
      <Link to="/home">Home</Link>
      <Link to="/addTask">+ Add task</Link>
      <Link to="/tasks">All</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default FooterNav;
