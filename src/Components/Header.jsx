// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { invalidateUser } from "../Features/Slices/UserSlice";
import { Link } from "react-router-dom";
import { deleteAllTasks } from "../Features/Slices/taskSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        credentials: "include",
        method: "POST",
      });

      const res = await response.json();

      if (!response.ok) {
        console.log(res.error);
        return;
      }
      dispatch(invalidateUser({}));
      dispatch(deleteAllTasks());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between bg-gray-200 rounded-2xl p-2 border-solid border-2 border-orange-500">
      <div className="font-bold">
        <p>DStudio</p>
      </div>
      <div className="flex flex-row gap-4 items-center">
        {userInfo?.userName ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to={"/login"} className="bg-orange-500 py-1 px-2 rounded-xl">
            Sign in
          </Link>
        )}
        <p>{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Header;
