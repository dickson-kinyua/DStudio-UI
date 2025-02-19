import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAllTasks,
  updateTasks,
  fetchTodo,
} from "../Features/Slices/taskSlice";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";

const DisplayAllTasks = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const userInfo = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleCompleted = async (id) => {
    //optimistic UI updating
    dispatch(updateTasks(id));

    try {
      console.log(id);
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
      dispatch(updateTasks(id));
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
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  return userInfo?.userName ? (
    <div className="flex flex-col gap-5 p-2">
      <Link to={"/home"} className="underline">
        Back to homepage
      </Link>
      <p className="font-bold text-2xl">
        {tasks?.length === 0
          ? "Make your day productive"
          : `Today you have ${tasks.length} tasks!`}
      </p>
      <div className="flex flex-col gap-2 bg-orange-500  p-2">
        <p className="font-semibold text-xl h-[4vh]">High priority🔥</p>
        <ul className="pl-1 grid grid-cols-2">
          {tasks
            ?.filter((task) => task.priority === "high")
            .map((task) => (
              <li
                className={`flex flex-row gap-2 ${
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
      <div className="flex flex-col gap-2 bg-orange-400 p-2">
        <p className="font-semibold text-xl">Other tasks</p>
        <ul className="pl-1 grid grid-cols-2">
          {tasks
            ?.filter((task) => task.priority !== "high")
            .map((task) => (
              <li
                className={`flex flex-row gap-2 ${
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

      <button className="bg-gray-400 text-gray-950 p-2" onClick={clearTasks}>
        Clear list ✖
      </button>
    </div>
  ) : (
    <LoginPage />
  );
};

export default DisplayAllTasks;
