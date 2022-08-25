import React from "react";
import logo from "../service/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-[60rem] mx-auto bg-slate-300 flex justify-between items-center">
      <Link to="/">
        <div className="h-14 py-2 px-4">
          <img src={logo} alt="logo" className="h-10 rounded-lg" />
        </div>
      </Link>
      <div>
        <p className="italic text-slate-100">
          "There are two ways to write error-free programs; only the third one
          works."
        </p>
      </div>
      <div className="pr-4 flex">
        <Link to="/" className="text-3xl text-slate-500">
          <FaHome />
        </Link>
        <button
          className="w-20 ml-6 rounded-lg bg-blue-300"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
        <button
          className="w-20 ml-2 rounded-lg bg-slate-100"
          onClick={() => navigate("/login")}
        >
          LOGIN
        </button>
      </div>
    </header>
  );
};

export default Header;
