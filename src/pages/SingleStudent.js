import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUniqueStudent } from "../service/data";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Grades from "../components/Grades";
import ModalDelete from "../components/ModalDelete";
import StudentForm from "../components/StudentForm";

const SingleStudent = () => {
  const { id: studentId } = useParams();
  const [student, setStudent] = useState({});
  const [allGrades, setAllGrades] = useState([]);

  useEffect(() => {
    getUniqueStudent(studentId)
      .then((data) => {
        setStudent(data);
        setAllGrades(data.gradeHistory);
      })
      .catch((msg) => console.log(msg));
  }, [studentId]);

  const { firstName, lastName, indexNumber, email, phone } = student;

  //implementing ModalDelete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const openModalDeleteHandler = () => {
    setIsModalDeleteOpen(true);
  };

  //implementing edit student data
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);

  const openFormHandler = () => {
    setIsStudentFormOpen(true);
  };

  //implementing edit grades data
  const [isEditGradeOpen, setIsEditGradeOpen] = useState(false);

  return (
    <>
      {isModalDeleteOpen && (
        <ModalDelete
          setIsModalDeleteOpen={setIsModalDeleteOpen}
          studentId={studentId}
        />
      )}

      {isStudentFormOpen ? (
        <StudentForm
          firstName={firstName}
          lastName={lastName}
          indexNumber={indexNumber}
          email={email}
          phone={phone}
          allGrades={allGrades}
          setIsStudentFormOpen={setIsStudentFormOpen}
          studentId={studentId}
        />
      ) : (
        <main className="h-[calc(100vh-112px)]">
          <section className="w-[56rem] mx-auto pt-4 flex justify-between">
            <div className="w-[80%]">
              <h1>First Name: {firstName}</h1>
              <h1>Last Name: {lastName}</h1>
              <h1>Index Number: {indexNumber}</h1>
              <h1>E-mail: {email}</h1>
              <h1>Contact Phone: {phone}</h1>
            </div>
            {!isEditGradeOpen && (
              <div>
                <button
                  className="text-2xl mr-3 text-slate-500"
                  onClick={openModalDeleteHandler}
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="text-2xl text-slate-500"
                  onClick={openFormHandler}
                >
                  <FaEdit />
                </button>
              </div>
            )}
          </section>
          <section>
            <Grades
              allGrades={allGrades}
              isEditGradeOpen={isEditGradeOpen}
              setIsEditGradeOpen={setIsEditGradeOpen}
              studentId={studentId}
            />
          </section>
        </main>
      )}
    </>
  );
};

export default SingleStudent;
