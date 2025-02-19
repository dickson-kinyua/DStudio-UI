import { useSelector } from "react-redux";
import LoginPage from "./LoginPage";
import React from "react";
import FooterNav from "../Components/Footer";

const Profile = () => {
  const userInfo = useSelector((state) => state.user.user);
  console.log(userInfo);

  return (
    <div className="bg-orange-500 h-[90vh]">
      <p>Dickson </p>
      <div></div>
      <FooterNav />
    </div>
  );
};

export default Profile;
