import React from "react";
import { Link } from "react-router-dom";
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
          <a href="https://github.com/HogarStrashni" target="_blanc">
            <FaGithub />
          </a>
          <a href="https://www.freecodecamp.org/HogarStrashni" target="_blanc">
            <FaFreeCodeCamp />
          </a>
          <a href="https://codepen.io/hogarstrashni" target="_blanc">
            <FaCodepen />
          </a>
          <a href="mailto:djmatic@agfbl.org" target="_blanc">
            <FaMailBulk />
          </a>
        </div>
        <div className="flex justify-center">
          <p>&copy;Copyright. All rights reserved</p>
        </div>
      </div>
      <div className="w-72 h-12 p-4 flex justify-between items-center text-sm">
        <a href="https://www.unibl.org/" target="_blanc">
          University
        </a>

        <Link to="/documentation">Documentation</Link>
        <Link to="/about">About Us</Link>
      </div>
    </footer>
  );
};

export default Footer;
