import React from "react";
import { Menu } from "@headlessui/react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Dropdown = ({ logoutHandler, loggedInUser }) => {
  return (
    <Menu as="div" className="relative text-right">
      <Menu.Button>
        <div className="flex items-center my-[12px] text-sm font-medium text-gray-50 bg-gray-400 hover:text-white hover:bg-blue-700 rounded-full">
          <FaUserCircle className="text-[38px] inherit" />
        </div>
      </Menu.Button>
      <Menu.Items className="absolute right-0 my-2 bg-blue-50 text-sm text-blue-500 text-left origin-top-right divide-y overflow-hidden opacity-100 z-20 divide-blue-200 rounded-md shadow-lg">
        <Menu.Item>
          <div className="py-2 px-6">
            <p className="">Logged in:</p>
            <p className="font-medium">{loggedInUser.email}</p>
          </div>
        </Menu.Item>
        <Menu.Item className="flex items-center py-2 px-6 font-medium cursor-pointer hover:bg-blue-200 hover:text-blue-800">
          <p onClick={() => logoutHandler()}>
            <FaSignOutAlt className="mt-0.5 mr-1" /> Log out
          </p>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
