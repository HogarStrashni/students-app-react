import React from "react";
import logo from "../service/logo.png";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-[60rem] mx-auto bg-slate-300 flex justify-between items-center">
      <div className="h-16 py-3 px-4">
        <img src={logo} alt="logo" className="h-10 rounded-lg" />
      </div>
      <div className="pr-4 flex">
        <form className="pr-4 flex">
          <label htmlFor="search-item" className="px-2 text-2xl text-slate-200">
            <FaSearch />
          </label>
          <input type="text" id="search-item" className="border-2 rounded " />
        </form>
        <button className="ml-12 border px-4 rounded-lg bg-green-300">
          LOGIN
        </button>
      </div>
    </header>
  );
};

export default Header;
