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

  const { firstName, lastName, indexNumber, email, phone, gradeHistory } =
    student;

  const studentObjectKeys = [
    "first name",
    "last name",
    "index number",
    "email",
    "contact phone",
  ];
  const studentObjectValues = [firstName, lastName, indexNumber, email, phone];

  //implementing ModalDelete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const openModalDeleteHandler = () => {
    setIsModalDeleteOpen(true);
  };

  const openFormHandler = () => {
    setIsStudentFormOpen(true);
  };

  // //implementing GPA
  let allGradesList = [];
  if (gradeHistory) {
    allGradesList = gradeHistory
      .map((item) => item.grade)
      .filter((item) => item);
  }
  const numberPassedExam = allGradesList.length;
  const valueGPA =
    numberPassedExam > 0
      ? (
          allGradesList.reduce((acc, item) => (acc += item), 0) /
          numberPassedExam
        ).toFixed(2)
      : "0.00";

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
        <main className="h-[calc(100vh-126px)] mt-3">
          {isLoading ? (
            <LoadingStage />
          ) : (
            <>
              <section className="w-[60rem] mx-auto flex justify-between">
                <div className="flex items-end">
                  <dl className="pr-12">
                    {studentObjectValues.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex border-b border-gray-100"
                        >
                          <dt className="w-36 pl-6 pt-1 text-sm font-medium text-gray-500 capitalize">
                            {studentObjectKeys[index]}:
                          </dt>
                          <dd className="pl-3 pr-6 pt-0.5 font-medium text-gray-900">
                            {item}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                  <dl>
                    <div className="flex border-b border-gray-100">
                      <dt className="w-36 pl-6 pt-1 text-sm font-medium text-gray-500 capitalize">
                        Passed Exams:
                      </dt>
                      <dd className="pl-3 pr-6 pt-0.5 font-medium text-gray-900">
                        {numberPassedExam}
                      </dd>
                    </div>
                    <div className="flex border-b border-gray-100">
                      <dt className="w-36 pl-6 pt-1 text-sm font-medium text-gray-500 capitalize">
                        Grade Average:
                      </dt>
                      <dd className="pl-3 pr-6 pt-0.5 font-medium text-gray-900">
                        {valueGPA}
                      </dd>
                    </div>
                  </dl>
                </div>
                {!isEditGradeOpen && (
                  <div className="h-6 mt-2 flex">
                    <button
                      className="mr-3 flex items-center h-8 px-3 text-sm font-medium text-red-500 hover:text-white ring-1 ring-red-500 hover:bg-red-500 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={openModalDeleteHandler}
                      disabled={loggedInUser?.role !== "admin"}
                    >
                      <FaTrashAlt className="text-xs" />
                      <span className="pl-1">Delete</span>
                    </button>
                    <button
                      className="flex items-center h-8 px-[18px] text-sm font-medium text-green-500 hover:text-white ring-1 ring-green-500 hover:bg-green-500 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={openFormHandler}
                      disabled={loggedInUser?.role !== "admin"}
                    >
                      <FaEdit />
                      <span className="pl-1">Edit</span>
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
