import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grades from "../components/Grades";
import ModalDelete from "../components/ModalDelete";
import StudentForm from "../components/StudentForm";
import LoadingStage from "../components/LoadingStage";
import axiosInstance from "../service/httpClient";
import StudentBasicInfo from "../components/StudentBasicInfo";

const SingleStudent = () => {
  const navigate = useNavigate();

  const { id: studentId } = useParams();
  const [student, setStudent] = useState({});

  // Setting LoadingStage for unique Student
  const [isLoading, setIsLoading] = useState(true);

  // Implementing edit grades data for dependency array
  const [isEditGradeOpen, setIsEditGradeOpen] = useState(false);

  // Implementing edit unique Student data
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);

  // Implementing delete student
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  useEffect(() => {
    if (isEditGradeOpen || isStudentFormOpen) return;
    setIsLoading(true);
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

  return (
    <>
      {isLoading && <LoadingStage />}
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
        <main>
          <section className="h-[calc(100vh-126px)]">
            <StudentBasicInfo
              setIsModalDeleteOpen={setIsModalDeleteOpen}
              setIsStudentFormOpen={setIsStudentFormOpen}
              isEditGradeOpen={isEditGradeOpen}
              student={student}
            />
            {!isLoading && (
              <Grades
                student={student}
                isEditGradeOpen={isEditGradeOpen}
                setIsEditGradeOpen={setIsEditGradeOpen}
                studentId={studentId}
              />
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default SingleStudent;
