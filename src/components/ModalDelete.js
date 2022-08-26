import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../service/httpClient";

const ModalDelete = ({ setIsModalDeleteOpen, studentId }) => {
  //returning on main page after delete comfirm
  const navigate = useNavigate();

  const deleteHandler = () => {
    axiosInstance
      .delete(`/student/${studentId}`)
      .then(() => setIsModalDeleteOpen(false))
      .catch((err) => console.log(err.message));
    navigate("/");
  };

  const closeModalDeleteHandler = () => {
    setIsModalDeleteOpen(false);
  };

  return (
    <>
      <article className="h-[calc(100vh)] w-[60rem] left-[calc(50vw-30rem)] top-0 mx-auto border bg-slate-600 opacity-10 absolute"></article>
      <article className="w-80 h-32 border-2 rounded-lg absolute top-60 left-[calc(50vw-10rem)] bg-white">
        <div className="h-[100%] flex flex-col items-center justify-around">
          <h1 className="text-xl">Are you sure?</h1>
          <div className="w-60 flex justify-around">
            <button
              className="w-20 rounded-lg bg-slate-300 border-2"
              onClick={closeModalDeleteHandler}
            >
              Cancel
            </button>
            <button
              className="w-20 rounded-lg bg-red-300 border-2"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default ModalDelete;
