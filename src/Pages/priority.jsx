import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "../Features/Slices/taskSlice";
import { Link } from "react-router-dom";

const Priority = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const isChecked = false;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleCompleted = async (id) => {
    const response = await fetch(`http://localhost:5000/editPost/${id}`, {
      method: "PUT",
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return;
    }
    const res = await response.json();
    console.log(res);
    dispatch(fetchTodo());
  };

  return (
    <div className="flex flex-col gap-10 p-3">
      <Link to={"/home"} className="underline">
        Back to homepage
      </Link>
      <p>High Priority</p>
      <ul className="bg-orange-500 p-2 grid grid-cols-2 gap-y-1  overflow-x-hidden">
        {tasks
          ?.filter((task) => task.priority === "high")
          .map((task) => (
            <li key={task._id}>
              <input
                type="checkbox"
                value={task.completed}
                checked={task.completed || isChecked}
                onChange={() => handleCompleted(task._id)}
              />
              {task.todo}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Priority;
