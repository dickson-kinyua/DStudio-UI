import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAllTasks,
  setTasks,
  updateTasks,
} from "../Features/Slices/taskSlice";
import { Link, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";

const DisplayAllTasks = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const userInfo = useSelector((state) => state.user.user);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:5000/fetchPosts", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }
      dispatch(setTasks(data));
    };
    fetchPosts();
  }, [dispatch, userInfo]);

  const handleCompleted = async (id) => {
    //optimistic UI updating
    dispatch(updateTasks(id));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/editPost/${id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      dispatch(updateTasks(id)); //revert to tasks state if error occurs
    }
  };

  const clearTasks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteAllPosts`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete all tasks");
      }

      dispatch(deleteAllTasks());
      setRedirect(true);
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/home"} />;
  }

  return userInfo?.userName ? (
    <div className="flex flex-col gap-5 p-2">
      <div className="flex flex-row items-center justify-between">
        <Link to={"/home"} className="underline sticky top-0">
          Back to homepage
        </Link>
        {tasks?.length > 0 ? (
          <button className="p-2 underline" onClick={clearTasks}>
            Clear list
          </button>
        ) : (
          <Link
            to={"/addTask"}
            className="bg-white rounded-2xl  text-center p-1"
          >
            + Create new goal
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2 p-2">
        <p className="font-semibold text-xl h-[4vh]">High priority🔥</p>
        <ul className="pl-1 grid grid-cols-1 gap-1">
          {tasks
            ?.filter((task) => task.priority === "high")
            .map((task) => (
              <li
                className={`flex flex-row gap-2 bg-gray-300 p-2 rounded-2xl text-gray-800 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
                key={task._id}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleted(task._id)}
                />
                {task.todo}
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <p className="font-semibold text-xl">Other tasks</p>
        <ul className="pl-1 grid grid-cols-1 gap-1">
          {tasks
            ?.filter((task) => task.priority !== "high")
            .map((task) => (
              <li
                className={`flex flex-row gap-2 bg-gray-300 p-2 rounded-2xl text-gray-800 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
                key={task._id}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleted(task._id)}
                />
                {task.todo}
              </li>
            ))}
        </ul>
      </div>
    </div>
  ) : (
    <LoginPage />
  );
};

export default DisplayAllTasks;
