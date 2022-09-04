import React from "react";
import { FaHome, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorStage = ({ setIsError, stateForm, setStateForm }) => {
  const navigate = useNavigate();
  return (
    <>
      <article className="w-[100%] h-[100%] top-0 bg-gray-200 opacity-70 absolute" />
      <div className="w-[34rem] h-44 border-2 rounded-lg absolute top-[calc(50%-5.5rem)] left-[calc(50%-17rem)] bg-white shadow-sm">
        <div className="h-[100%] flex flex-col items-center justify-around py-6">
          <h1 className="font-medium">
            Index Number already exists... Try again with a different value!
          </h1>
          <div className="flex">
            <button
              className="mr-7 flex items-center h-8 px-5 text-sm font-medium text-blue-500 hover:text-white ring-1 ring-blue-500 hover:bg-blue-500 rounded-lg"
              onClick={() => {
                setIsError(false);
                navigate("/");
              }}
            >
              <FaHome />
              <span className="pl-1">Back To Home</span>
            </button>
            <button
              className="flex items-center h-8 px-3 text-sm font-medium text-blue-500 hover:text-white ring-1 ring-blue-500 hover:bg-blue-500 rounded-lg"
              onClick={() => {
                setStateForm({ ...stateForm, indexNumber: "" });
                setIsError(false);
                navigate("/student/new-student");
              }}
            >
              <FaUserPlus />
              <span className="pl-1">Add New Student</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorStage;
