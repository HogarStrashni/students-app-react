import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from "../service/logo.png";

const HeaderDoc = () => {
  return (
    <header className="w-[60rem] h-16 mx-auto bg-slate-300 flex justify-between items-center">
      <div className="h-16 py-3 px-4">
        <img src={logo} alt="logo" className="h-10 rounded-lg" />
      </div>

      <Link to="/" className="text-3xl mr-4 text-slate-100">
        <FaHome />
      </Link>
    </header>
  );
};

export default HeaderDoc;
