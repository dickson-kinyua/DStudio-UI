// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./Components/createPost";
import FooterNav from "./Components/Footer";
import Layout from "./Pages/Layout";
import DisplayAllTasks from "./Pages/DisplayAllTasks";
import LandingPage from "./Pages/LandingPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import Profile from "./Pages/Profile";
import Priority from "./Pages/priority";

function App() {
  return (
    <Router>
      <div
        className=" text-gray-700 bg-gray-100
       h-[100vh] sm:h-auto"
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Layout />} />
          <Route path="/addTask" element={<CreatePost />} />
          <Route path="/tasks" element={<DisplayAllTasks />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/priority" element={<Priority />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
