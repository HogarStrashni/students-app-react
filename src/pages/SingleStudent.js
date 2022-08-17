import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Grades from "../components/Grades";
import ModalDelete from "../components/ModalDelete";
import StudentForm from "../components/StudentForm";
import LoadingStage from "../components/LoadingStage";
import axios from "axios";

const SingleStudent = () => {
  const { id: studentId } = useParams();
  const [student, setStudent] = useState({});
  const [allGrades, setAllGrades] = useState([]);

  //loading students and LoadingStage
  const [isLoading, setIsLoading] = useState(true);

  //implementing edit grades data
  const [isEditGradeOpen, setIsEditGradeOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://students-app-server-plum.vercel.app/api/student/${studentId}`
      )
      .then((response) => {
        setStudent(response.data);
        setAllGrades(response.data.gradeHistory);
        setIsLoading(false);
      })
      .catch((msg) => console.log(msg));
  }, [studentId, isEditGradeOpen, student]);

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
          setIsStudentFormOpen={setIsStudentFormOpen}
          studentId={studentId}
        />
      ) : (
        <main className="h-[calc(100vh-116px)] mt-3">
          {isLoading ? (
            <LoadingStage />
          ) : (
            <>
              <section className="w-[56rem] mx-auto flex justify-between">
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
            </>
          )}
        </main>
      )}
    </>
  );
};

export default SingleStudent;
