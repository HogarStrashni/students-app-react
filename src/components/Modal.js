import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppSearchContext } from "../context";
import { getStudentsAfterDelete } from "../service/data";

const Modal = ({ setIsModalOpen, studentId }) => {
  const { setStudents } = useContext(AppSearchContext);

  const [studentsDel, setStudentsDel] = useState({});

  useEffect(() => {
    getStudentsAfterDelete(studentId)
      .then((data) => setStudentsDel(data))
      .catch((msg) => console.log(msg));
  }, [studentId]);

  //returning on main page after delete comfirm
  const navigate = useNavigate();

  const deleteHandler = () => {
    setStudents(studentsDel);
    setIsModalOpen(false);
    navigate("/");
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
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
              onClick={closeModalHandler}
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

export default Modal;
