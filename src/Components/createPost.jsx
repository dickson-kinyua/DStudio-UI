// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { fetchTodo } from "../Features/Slices/taskSlice";

import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../Pages/LoginPage";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(null);
  const [priority, setPriority] = useState("normal");

  const userInfo = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleCreateTask = async (e) => {
    const newPost = { todo, priority };
    setTodo("");

    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/createPost`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }
      setTodo("");
      dispatch(fetchTodo());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 p-3">
      <Link to={"/home"} className="underline p-2">
        Back to homepage
      </Link>
      {userInfo?.userName ? (
        <form
          onSubmit={handleCreateTask}
          className="flex flex-col w-3/4 gap-4 p-3"
        >
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            maxLength={20}
            type="text"
            className="p-2 text-black w-full bg-gray-200"
            placeholder="Task title"
          />
          <select
            onChange={(e) => handlePriority(e)}
            className="bg-gray-200 text-gray-900 w-full p-2"
          >
            <option value="normal">Priority(Normal)</option>
            <option value="high">Priority(High)</option>
          </select>
          <button className="bg-orange-600 w-full p-3 text-white">
            Add to list 📃{" "}
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      ) : (
        <LoginPage />
      )}

      {/* <FooterNav /> */}
    </div>
  );
};

export default CreatePost;
