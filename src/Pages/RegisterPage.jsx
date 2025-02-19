import React, { useState } from "react";
import FooterNav from "../Components/Footer";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = { name, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        setError(error.error);
        return;
      }

      const res = await response.json();
      console.log(res);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex flex-col w-full items-center pt-5 h-[100vh] bg-orange-500 z-40">
      <p className="font-bold text-2xl">Register a new account</p>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 mt-10 w-3/4"
      >
        <input
          type="text"
          placeholder="Your name( max 8 characters)"
          value={name}
          maxLength={8}
          onChange={(e) => setName(e.target.value)}
          className="p-3 text-gray-700 bg-gray-200"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
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
