import React from "react";
import {
  FaGithub,
  FaCodepen,
  FaFreeCodeCamp,
  FaMailBulk,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-[60rem] h-12 bg-slate-300 mx-auto flex justify-between text-slate-700">
      <div className="w-72 h-12" />
      <div className="w-56 h-12 flex-col text-xs">
        <div className="w-32 flex justify-between text-xl mx-auto mt-1.5">
          <button>
            <FaGithub />
          </button>
          <button>
            <FaFreeCodeCamp />
          </button>
          <button>
            <FaCodepen />
          </button>
          <button>
            <FaMailBulk />
          </button>
        </div>
        <div className="flex justify-center">
          <p>&copy;Copyright. All rights reserved</p>
        </div>
      </div>
      <div className="w-72 h-12 p-4 flex justify-between items-center text-sm">
        <p>University</p>
        <p>Documentation</p>
        <p>About Us</p>
      </div>
    </footer>
  );
};

export default Footer;
