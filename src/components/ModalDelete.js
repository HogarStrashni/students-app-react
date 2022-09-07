import React from "react";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../service/httpClient";
import { Toaster } from "react-hot-toast";
import { infoChanged } from "../service/toastLogic";

const ModalDelete = ({ setIsModalDeleteOpen, studentId }) => {
  const navigate = useNavigate();

  const deleteHandler = () => {
    axiosInstance
      .delete(`/student/${studentId}`)
      .then(() => {
        setIsModalDeleteOpen(false);
        infoChanged("Successfully Deleted Student");
      })
      .catch((err) => console.log(err.message));
    navigate("/");
  };

  const closeModalDeleteHandler = () => {
    setIsModalDeleteOpen(false);
  };

  return (
    <>
      <Toaster />
      <article
        className="w-[100%] h-[100%] top-0 bg-gray-200 opacity-70 absolute"
        onClick={closeModalDeleteHandler}
      />
      <article className="w-72 h-44 border-2 rounded-lg absolute top-[calc(50%-5.5rem)] left-[calc(50%-9rem)] bg-white shadow-sm">
        <div className="h-[100%] flex flex-col items-center justify-around py-6">
          <h1 className="font-medium">Are you sure?</h1>
          <div className="flex">
            <button
              className="mr-7 flex items-center h-8 px-3 text-sm font-medium text-gray-500 ring-1 ring-gray-400 hover:bg-gray-100 rounded-lg"
              onClick={closeModalDeleteHandler}
            >
              <GiCancel />
              <span className="pl-1">Cancel</span>
            </button>
            <button
              className="flex items-center h-8 px-3 text-sm font-medium text-white ring-1 bg-red-500 ring-red-500 hover:bg-red-700 rounded-lg"
              onClick={deleteHandler}
            >
              <GiConfirmed />
              <span className="pl-1">Delete</span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default ModalDelete;
