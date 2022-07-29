import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUniqeStudent } from "../service/data";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Grades from "../components/Grades";
import { AppSearchContext } from "../context";
import Modal from "../components/Modal";

const SingleStudent = () => {
  const { setSearchItem } = useContext(AppSearchContext);

  const [student, setStudent] = useState({});
  const { id: studentId } = useParams();

  useEffect(() => {
    getUniqeStudent(studentId)
      .then((data) => setStudent(data))
      .catch((msg) => console.log(msg));
    setSearchItem("");
  }, [studentId, setSearchItem]);

  const { firstName, lastName, indexNumber, email, phone } = student;

  //implementing Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} studentId={studentId} />
      )}

      <main className="h-[calc(100vh-144px)]">
        <section className="w-[56rem] mx-auto my-8 flex justify-between">
          <div className="w-[80%]">
            <h1>First Name: {firstName}</h1>
            <h1>Last Name: {lastName}</h1>
            <h1>Index Number: {indexNumber}</h1>
            <h1>E-mail: {email}</h1>
            <h1>Contact Phone: {phone}</h1>
          </div>
          <div>
            <button
              className="text-2xl mr-3 text-slate-500"
              onClick={openModalHandler}
            >
              <FaTrashAlt />
            </button>
            <button className="text-2xl text-slate-500">
              <FaEdit />
            </button>
          </div>
        </section>
        <section>
          <Grades />
        </section>
      </main>
    </>
  );
};

export default SingleStudent;
