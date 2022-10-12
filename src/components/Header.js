import React from "react";
import logo from "../assets/logo.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { logoutUser } from "../utils/auth";
import Dropdown from "./Dropdown";
import { infoChanged } from "../utils/toastLogic";
import { hoverLink } from "../assets/tailwindCSS";

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
    <header className="h-16 px-[4%] flex justify-between text-gray-500 border-b-2">
      <div className="h-14 pl-4 min-w-[46rem] pr-6 my-auto flex justify-between items-center rounded-xl">
        <a
          href="https://www.mongodb.com/mern-stack"
          target="_blanc"
          className="flex"
        >
          <img
            src={logo}
            alt="logo"
            className="h-14 w-14 rounded-lg cursor-pointer"
          />{" "}
          <div className="ml-2 text-[#39B54A] pt-0.5">
            <h2 className="text-2xl">
              <span className="font-extrabold">ONLINE</span> STUDY
            </h2>
            <h3 className="text-xs text-center font-medium">
              NO STUCK WITH MERN STACK
            </h3>
          </div>
        </a>
        <div className="w-96 ml-16 flex justify-between items-center text-sm font-medium text-gray-500">
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
            className="px-5 ml-auto my-3 shadow-sm flex items-center text-sm font-medium text-gray-50 bg-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 rounded-lg"
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
