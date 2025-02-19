import React from "react";
import { useSelector } from "react-redux";

const Welcoming = () => {
  const userInfo = useSelector((state) => state.user.user);
  const tasks = useSelector((state) => state.task.tasks) || [];
  const totalTasks = tasks?.length;
  const completedTasks =
    tasks?.reduce((count, task) => count + (task.completed ? 1 : 0), 0) || null;

  return (
    <div className="w-full p-2">
      {userInfo.userName ? (
        <p className="text-xl font-bold text-center h-10 capitalize">
          {completedTasks <= 0 && `Welcome back, ${userInfo.userName}!`}
          {completedTasks > 0 &&
            completedTasks < totalTasks &&
            "Yuhuu, your work is almost done!"}
          {completedTasks === totalTasks &&
            "You are a masterpiece, congratulations!"}
        </p>
      ) : (
        <p className="text-xl  font-bold text-center">
          Get started by signing in
        </p>
      )}
    </div>
  );
};

export default Welcoming;
