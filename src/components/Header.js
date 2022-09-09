import React from "react";
import logo from "../service/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context";
import { logoutUser } from "../service/auth";
import Dropdown from "./Dropdown";
import { Toaster } from "react-hot-toast";
import { infoChanged } from "../service/toastLogic";
import { hoverLink } from "../service/tailwindCSS";

const Header = () => {
  const { loggedInUser, setloggedInUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    logoutUser();
    setloggedInUser(null);
    navigate("/");
    infoChanged("Successfully Logged Out");
  };

  return (
    <header className="h-16 px-[4%] mx-auto flex justify-between text-gray-500 border-b-2">
      <Toaster />
      <div className="flex justify-between items-center">
        <a href="https://www.mongodb.com/mern-stack" target="_blanc">
          <img
            src={logo}
            alt="logo"
            className="h-12 rounded-lg cursor-pointer"
          />{" "}
        </a>

        <div className="w-96 ml-12 flex justify-between items-center text-sm font-medium text-gray-500">
          <p onClick={() => navigate("/")} className={`${hoverLink.header}`}>
            Home
          </p>
          <a
            href="https://www.unibl.org/"
            target="_blanc"
            className={`${hoverLink.header}`}
          >
            University
          </a>
          <p
            onClick={() => navigate("/documentation")}
            className={`${hoverLink.header}`}
          >
            Documentation
          </p>
          <p
            onClick={() => navigate("/about")}
            className={`${hoverLink.header}`}
          >
            About Us
          </p>
        </div>
      </div>
      {!loggedInUser ? (
        !(
          location.pathname === "/login" || location.pathname === "/register"
        ) &&
        !loggedInUser && (
          <button
            className="px-5 my-3 shadow-sm flex items-center text-sm font-medium text-gray-50 bg-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 rounded-lg"
            onClick={() => navigate("/login")}
          >
            <FaSignInAlt className="mr-1 text-inherit" />
            Login
          </button>
        )
      ) : (
        <Dropdown logoutHandler={logoutHandler} loggedInUser={loggedInUser} />
      )}
    </header>
  );
};

export default Header;
