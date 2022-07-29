import React, { useContext } from "react";
import { AppSearchContext } from "../context";
import { useNavigate } from "react-router-dom";

const Modal = ({ setIsModalOpen, studentId }) => {
  const { students, setStudents } = useContext(AppSearchContext);

  //returning on main page after delete comfirm
  const navigate = useNavigate();

  const deleteHandler = () => {
    const newStudentList = students.filter(
      (item) => item.indexNumber !== studentId
    );
    setStudents(newStudentList);
    setIsModalOpen(false);
    navigate("/");
  };
  console.log(students);

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article className="h-[calc(100vh)] w-[60rem] left-[calc(50vw-30rem)] top-0 mx-auto border bg-slate-600 opacity-10 absolute"></article>
      <article className="w-80 h-32 border-2 rounded-lg absolute top-60 left-[38rem] bg-white">
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
