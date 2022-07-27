import React from "react";
import logo from "../service/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="w-[60rem] mx-auto bg-slate-300 flex justify-between items-center">
        <Link to="/">
          <div className="h-16 py-3 px-4">
            <img src={logo} alt="logo" className="h-10 rounded-lg" />
          </div>
        </Link>
        <div className="pr-4 flex">
          <button className="ml-12 border px-4 rounded-lg bg-green-300">
            LOGIN
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
