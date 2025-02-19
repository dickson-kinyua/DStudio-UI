import Header from "../Components/Header";
import Welcoming from "../Components/Welcoming";
import DisplayTasks from "../Components/DisplayTasks";
import React from "react";

const Layout = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Header />
      <Welcoming />
      <DisplayTasks />
      {/* <FooterNav /> */}
    </div>
  );
};

export default Layout;
