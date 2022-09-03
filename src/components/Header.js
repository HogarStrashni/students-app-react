import React from "react";
import logo from "../service/logo.png";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context";
import { logoutUser } from "../service/auth";
import toast, { Toaster } from "react-hot-toast";
import Dropdown from "./Dropdown";

// TailWindCSS variable
const hoverHeaderLinks =
  "p-2 rounded-lg hover:ring-1 hover:ring-blue-100 hover:text-gray-900 cursor-pointer";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser();
    setloggedInUser(null);
    navigate("/");
    notifyLoggedOut();
  };

  //Toaster implementation
  const notifyLoggedOut = () => toast.error("Successfully Logged Out");

  const { loggedInUser, setloggedInUser } = useAuth();

  return (
    <header className="h-16 px-[4%] mx-auto flex justify-between text-gray-500 border-b-2">
      <Toaster />
      <div className="flex justify-between items-center">
        <img
          src={logo}
          alt="logo"
          className="h-12 rounded-lg cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="w-96 ml-12 flex justify-between items-center text-sm font-medium text-gray-500">
          <p onClick={() => navigate("/")} className={`${hoverHeaderLinks}`}>
            Home
          </p>
          <a
            href="https://www.unibl.org/"
            target="_blanc"
            className={`${hoverHeaderLinks}`}
          >
            University
          </a>
          <p
            onClick={() => navigate("/documentation")}
            className={`${hoverHeaderLinks}`}
          >
            Documentation
          </p>
          <p
            onClick={() => navigate("/about")}
            className={`${hoverHeaderLinks}`}
          >
            About Us
          </p>
        </div>
      </div>
      {!loggedInUser ? (
        <button
          className="flex items-center px-5 my-4 text-sm font-medium text-slate-100 bg-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg shadow-sm"
          onClick={() => navigate("/login")}
        >
          <FaSignInAlt className="mr-1 text-inherit" />
          Login
        </button>
      ) : (
        <Dropdown logoutHandler={logoutHandler} loggedInUser={loggedInUser} />
      )}
    </header>
  );
};

export default Header;
