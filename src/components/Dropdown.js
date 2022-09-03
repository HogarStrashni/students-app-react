import React from "react";
import { Menu } from "@headlessui/react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Dropdown = ({ logoutHandler, loggedInUser }) => {
  return (
    <Menu as="div" className="relative text-right">
      <Menu.Button>
        <div className="flex items-center my-[12px] text-sm font-medium text-gray-50 bg-gray-400 hover:text-white border hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full">
          <FaUserCircle className="text-[38px] inherit" />
        </div>
      </Menu.Button>
      <Menu.Items className="absolute right-0 my-2 bg-gray-50 text-left origin-top-right divide-y opacity-100 divide-gray-300 rounded-md shadow-lg  focus:outline-none border border-gray-100">
        <Menu.Item>
          <div className="py-2 px-6">
            <p className="text-sm">Logged in:</p>
            <p className="font-medium">{loggedInUser.email}</p>
          </div>
        </Menu.Item>
        <Menu.Item className="flex items-center py-2 px-6 text-sm font-medium cursor-pointer hover:bg-blue-300 hover:text-gray-900">
          <p onClick={() => logoutHandler()}>
            <FaSignOutAlt className="pt-1 text-lg" /> Log out
          </p>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;