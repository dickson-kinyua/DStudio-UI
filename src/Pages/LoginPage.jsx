import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../Features/Slices/UserSlice";

const LoginPage = () => {
  // const userInfo = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading("loader");
    const data = { name, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        setError(error.error);
        setLoading("");

        return;
      }

      const res = await response.json();
      setLoading("");

      dispatch(updateUser(res));
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="flex flex-col gap-3 p-2">
      <div className={loading}></div>
      <p className="text-xl">Sign in and get started</p>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3  w-3/4 md:w-1/4"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 text-gray-800 bg-gray-200"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 text-gray-800 bg-gray-200"
        />
        <button className="bg-gray-600 text-white p-3">Login</button>
      </form>
      {error && <div className="text-red-500">{error}</div>}

      <p>
        New to DStudio?
        <Link to={"/register"} className="underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
