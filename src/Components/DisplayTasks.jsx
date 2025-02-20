import { useDispatch, useSelector } from "react-redux";
import { setTasks, updateTasks } from "../Features/Slices/taskSlice";
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link } from "react-router-dom";

const DisplayTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks) || [];
  const userInfo = useSelector((state) => state.user.user);

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

  const totalTasks = tasks.length;
  const completedTasks = tasks.reduce(
    (count, task) => count + (task.completed ? 1 : 0),
    0
  );
  const completedPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const pieData = [
    { name: "Completed", value: completedPercentage },
    { name: "Remaining", value: 100 - completedPercentage },
  ];
  const colors = ["#0088FE", "#DDDDDD"]; // Blue for completed, gray for remaining

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
      dispatch(updateTasks(id));
    }
  };
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex flex-col sm:flex-row w-full">
        <div className="h-auto flex justify-center  bg-orange-500 p-2 rounded-2xl sm:mt-1">
          <PieChart width={300} height={160}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="relative w-full flex items-center justify-center sm:items-start text-gray-900 font-semibold mt-10 sm:mt-1">
          <Link
            className="bg-gray-200  rounded-2xl w-fit text-center p-2 "
            to="/addTask"
          >
            + Create new goal
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:absolute right-5 top-48">
        <p className="font-medium text-xl sm:text-center">To do today📝</p>
        {userInfo?.userName && (
          <ul className="flex flex-col gap-1 mt-2">
            {tasks.slice(0, 2).map((task) => (
              <li
                key={task._id}
                className="bg-gray-300 p-2 rounded-2xl text-gray-800"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleted(task._id)}
                />{" "}
                {task.todo}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-row gap-6 ">
          <Link to="/tasks" className="underline">
            View all tasks ↗
          </Link>
          <Link to="/tips" className="underline">
            Tips for today ↗
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayTasks;
