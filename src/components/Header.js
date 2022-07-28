import React from "react";
import logo from "../service/logo.png";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaHome } from "react-icons/fa";

const Header = () => {
  // location path
  const location = useLocation();

  return (
    <>
      <header className="w-[60rem] mx-auto bg-slate-300 flex justify-between items-center">
        <Link to="/">
          <div className="h-16 py-3 px-4">
            <img src={logo} alt="logo" className="h-10 rounded-lg" />
          </div>
        </Link>
        {location.pathname === "/" && <SearchBar />}
        <div className="pr-4 flex">
          <Link to="/" className="text-3xl text-slate-500">
            <FaHome />
          </Link>
          <button className="ml-4 px-4 rounded-lg bg-green-300">LOGIN</button>
        </div>
      </header>
    </>
  );
};

export default Header;
