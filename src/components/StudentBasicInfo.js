import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../context";
import { classButton, dataList } from "../service/tailwindCSS";

const StudentBasicInfo = ({
  setIsModalDeleteOpen,
  setIsStudentFormOpen,
  isEditGradeOpen,
  student,
}) => {
  const { loggedInUser } = useAuth();
  const {
    firstName,
    lastName,
    indexNumber,
    email,
    phone,
    gradeHistory,
    averageGrade,
  } = student;

  // Helper for maping info
  const studentObjectKeys = [
    "first name",
    "last name",
    "index number",
    "email",
    "contact phone",
  ];
  const studentObjectValues = [firstName, lastName, indexNumber, email, phone];

  // Implementing number of passed exams
  let allGradesList = [];
  if (gradeHistory) {
    allGradesList = gradeHistory
      .map((item) => item.grade)
      .filter((item) => item);
  }
  const numberPassedExam = allGradesList.length;

  return (
    <section className="w-[60rem] mx-auto my-3 flex justify-between">
      <div className="flex items-end">
        <dl className="pr-12">
          {studentObjectValues.map((item, index) => {
            return (
              <div key={index} className={`${dataList.dl}`}>
                <dt className={`${dataList.dt}`}>
                  {studentObjectKeys[index]}:
                </dt>
                <dd className={`${dataList.dd}`}>{item}</dd>
              </div>
            );
          })}
        </dl>
        <dl>
          <div className={`${dataList.dl}`}>
            <dt className={`${dataList.dt}`}>Passed Exams:</dt>
            <dd className={`${dataList.dd}`}>{numberPassedExam}</dd>
          </div>
          <div className={`${dataList.dl}`}>
            <dt className={`${dataList.dt}`}>Grade Average:</dt>
            <dd className={`${dataList.dd}`}>{averageGrade?.toFixed(2)}</dd>
          </div>
        </dl>
      </div>
      {!isEditGradeOpen && (
        <div className="h-6 mt-2 flex">
          <button
            className={`mr-3 px-2.5 ${classButton.primary}`}
            onClick={() => setIsModalDeleteOpen(true)}
            disabled={loggedInUser?.role !== "admin"}
          >
            <FaTrashAlt className="text-xs" />
            <span className="pl-1">Delete</span>
          </button>
          <button
            className={`px-4 ${classButton.primary}`}
            onClick={() => setIsStudentFormOpen(true)}
            disabled={loggedInUser?.role !== "admin"}
          >
            <FaEdit />
            <span className="pl-1">Edit</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default StudentBasicInfo;
