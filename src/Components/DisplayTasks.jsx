import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, updateTasks } from "../Features/Slices/taskSlice";
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link } from "react-router-dom";

const DisplayTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks) || [];

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

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
    const updated = tasks?.map((task) =>
      task._id === id ? { ...task, completed: "!completed" } : task
    );

    dispatch(updateTasks(updated));

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

      dispatch(fetchTodo()); // Refresh tasks only if update succeeds
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return (
    <div className="flex flex-col gap-3  p-2">
      <div className="h-auto flex justify-center w-full bg-orange-500 p-2 rounded-2xl">
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
      <div className="w-full flex items-center justify-center text-gray-900 font-semibold mt-4">
        <Link
          className="bg-white rounded-2xl w-fit text-center p-2"
          to="/addTask"
        >
          + Create new goal
        </Link>
      </div>

      <div>
        <p className="font-medium text-xl">To do today</p>
        <ul className="flex flex-col gap-1 mt-2">
          {tasks.slice(0, 3).map((task) => (
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
      </div>
      <div className="flex flex-row gap-6">
        <Link to="/tasks" className="underline">
          View all tasks ↗
        </Link>
        <Link to="/priority" className="underline">
          High priority ↗
        </Link>
      </div>

      {/* <div className="h-[20vh] border-solid border-2 border-gray-100">
        <p className="bg-white text-gray-900 p-1">Today's Advice</p>
        <ul className="p-1">
          <li>Remember to get some sunlight ☀️</li>
          <li>Spend time with nature 🌿</li>
          <li>Learn something new 📖</li>
        </ul>
      </div> */}
    </div>
  );
};

export default DisplayTasks;
