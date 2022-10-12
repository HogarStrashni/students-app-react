import React from "react";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../service/httpClient";
import { infoChanged } from "../utils/toastLogic";
import { classButton } from "../assets/tailwindCSS";

const ModalDelete = ({ setIsModalDeleteOpen, studentId }) => {
  const navigate = useNavigate();

  const deleteHandler = () => {
    axiosInstance
      .delete(`/student/${studentId}`)
      .then(() => {
        setIsModalDeleteOpen(false);
        infoChanged("Successfully Deleted Student");
      })
      .then(() => navigate("/"))
      .catch((err) => console.log(err.message));
  };

  const closeModalDeleteHandler = () => {
    setIsModalDeleteOpen(false);
  };

  return (
    <>
      <article
        className="w-[100%] h-[100%] top-0 bg-gray-200 opacity-70 absolute"
        onClick={closeModalDeleteHandler}
      />
      <article className="w-72 h-44 border-2 rounded-lg absolute top-[calc(50%-5.5rem)] left-[calc(50%-9rem)] bg-white shadow-sm">
        <div className="h-[100%] flex flex-col items-center justify-around py-6">
          <h1 className="font-medium">Are you sure?</h1>
          <div className="flex">
            <button
              className={`mr-7 ${classButton.secondaryGray}`}
              onClick={closeModalDeleteHandler}
            >
              <GiCancel />
              <span className="pl-1">Cancel</span>
            </button>
            <button
              className={`px-3 ${classButton.secondaryRed}`}
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
