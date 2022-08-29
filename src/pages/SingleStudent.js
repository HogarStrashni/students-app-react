import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Grades from "../components/Grades";
import ModalDelete from "../components/ModalDelete";
import StudentForm from "../components/StudentForm";
import LoadingStage from "../components/LoadingStage";
import axiosInstance from "../service/httpClient";
import { useAuth } from "../context";

const SingleStudent = () => {
  const { loggedInUser } = useAuth();

  const navigate = useNavigate();

  const { id: studentId } = useParams();
  const [student, setStudent] = useState({});

  //loading students and LoadingStage
  const [isLoading, setIsLoading] = useState(true);

  //implementing edit grades data
  const [isEditGradeOpen, setIsEditGradeOpen] = useState(false);

  //implementing edit student data
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/student/${studentId}`)
      .then((response) => {
        setStudent(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
        err.response.request.status !== 404
          ? navigate(`/login?path=student/${studentId}`)
          : navigate("*");
      });
  }, [isEditGradeOpen, isStudentFormOpen, studentId, navigate]);

  const { firstName, lastName, indexNumber, email, phone } = student;

  //implementing ModalDelete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const openModalDeleteHandler = () => {
    setIsModalDeleteOpen(true);
  };

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
          student={student}
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
                      className="text-2xl mr-3 text-slate-500 disabled:opacity-30"
                      onClick={openModalDeleteHandler}
                      disabled={loggedInUser?.role !== "admin"}
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      className="text-2xl text-slate-500 disabled:opacity-30"
                      onClick={openFormHandler}
                      disabled={loggedInUser?.role !== "admin"}
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </section>
              <section>
                <Grades
                  student={student}
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
