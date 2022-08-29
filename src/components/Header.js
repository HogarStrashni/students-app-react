import React from "react";
import logo from "../service/logo.png";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context";
import { logoutUser } from "../service/auth";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser();
    setloggedInUser(null);
    navigate("/");
  };

  const { loggedInUser, setloggedInUser } = useAuth();

  return (
    <header className="w-[60rem] mx-auto bg-slate-300 flex justify-between items-center">
      <div className="h-14 py-2 px-4">
        <img
          src={logo}
          alt="logo"
          className="h-10 rounded-lg cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div>
        {!loggedInUser ? (
          <p className="italic text-slate-100">
            "There are two ways to write error-free programs; only the third one
            works."
          </p>
        ) : (
          <p className="italic text-slate-100">
            You are logged as: {loggedInUser.email}
          </p>
        )}
      </div>
      <div className="pr-4 flex">
        <FaHome
          className="text-3xl text-slate-500 cursor-pointer"
          onClick={() => navigate("/")}
        />
        {!loggedInUser ? (
          <button
            className="w-24 ml-8 rounded-lg border bg-blue-300"
            onClick={() => navigate("/login")}
          >
            <FaSignInAlt className="inline-block mr-1 mb-1" /> Login
          </button>
        ) : (
          <button
            className="w-24 ml-8 rounded-lg border border-slate-400 bg-red-300"
            onClick={() => logoutHandler()}
          >
            <FaSignOutAlt className="inline-block mb-1" /> Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
