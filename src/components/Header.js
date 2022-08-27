import React from "react";
import logo from "../service/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context";
import { logoutUser } from "../service/auth";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser();
    setLoggedUser(null);
    navigate("/");
  };

  const { loggedUser, setLoggedUser } = useAuth();

  return (
    <header className="w-[60rem] mx-auto bg-slate-300 flex justify-between items-center">
      <Link to="/">
        <div className="h-14 py-2 px-4">
          <img src={logo} alt="logo" className="h-10 rounded-lg" />
        </div>
      </Link>
      <div>
        {!loggedUser ? (
          <p className="italic text-slate-100">
            "There are two ways to write error-free programs; only the third one
            works."
          </p>
        ) : (
          <p className="italic text-slate-100">
            You are logged as: {loggedUser.email}
          </p>
        )}
      </div>
      <div className="pr-4 flex">
        <Link to="/" className="text-3xl text-slate-500">
          <FaHome />
        </Link>

        {!loggedUser ? (
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
