// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../Features/Slices/UserSlice";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading("loader");
    const data = { name, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const res = await response.json();

      if (!response.ok) {
        setError(res.error);
        setLoading("");
        return;
      }
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
    <div className="flex flex-col items-center w-full gap-5 p-2 ">
      <div className={loading}></div>
      <p className="text-xl">Create a new account</p>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4  w-3/4 md:w-1/4"
      >
        <input
          type="text"
          placeholder="Username( max 8 characters)"
          value={name}
          required
          maxLength={8}
          onChange={(e) => setName(e.target.value)}
          className="p-3 text-gray-700 bg-gray-200"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 text-gray-700 bg-gray-200"
        />
        <button className="bg-gray-600 text-white p-3">Register</button>
      </form>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default RegisterPage;
