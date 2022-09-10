import React from "react";
import {
  FaGithub,
  FaFreeCodeCamp,
  FaLinkedin,
  FaMailBulk,
  FaCreativeCommons,
  FaCreativeCommonsBy,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="h-12 px-[4%] mx-auto flex justify-between text-gray-500 border-t-2">
      <div className="h-12 flex items-center">
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="italic text-xs font-medium"
          target="_blanc"
        >
          <p className="flex items-center hover:text-blue-400">
            <span className="text-base">
              <FaCreativeCommons />
            </span>
            <span className="text-base pr-1">
              <FaCreativeCommonsBy />
            </span>
            Creative Commons
          </p>
        </a>
      </div>
      <div className="w-36 h-12 text-xl flex justify-between items-center">
        <a
          href="https://www.linkedin.com/in/djordje-matic/"
          target="_blanc"
          className="hover:text-blue-700"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/HogarStrashni"
          target="_blanc"
          className="hover:text-gray-900"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.freecodecamp.org/HogarStrashni"
          target="_blanc"
          className="hover:text-gray-900"
        >
          <FaFreeCodeCamp />
        </a>
        <a
          href="mailto:djmatic@agfbl.org"
          target="_blanc"
          className="hover:text-blue-700"
        >
          <FaMailBulk />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
