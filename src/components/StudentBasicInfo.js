import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../context";

const StudentBasicInfo = ({
  setIsModalDeleteOpen,
  setIsStudentFormOpen,
  isEditGradeOpen,
  student,
}) => {
  const { loggedInUser } = useAuth();
  const { firstName, lastName, indexNumber, email, phone, gradeHistory } =
    student;

  // Helper for maping info
  const studentObjectKeys = [
    "first name",
    "last name",
    "index number",
    "email",
    "contact phone",
  ];
  const studentObjectValues = [firstName, lastName, indexNumber, email, phone];

  // Implementing GPA
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
    <section className="w-[60rem] mx-auto my-3 flex justify-between">
      <div className="flex items-end">
        <dl className="pr-12">
          {studentObjectValues.map((item, index) => {
            return (
              <div key={index} className="flex border-b border-gray-100">
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
            className="mr-3 flex items-center h-8 px-2.5 text-sm font-medium text-blue-700 hover:text-white ring-1 ring-blue-700 hover:bg-blue-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => setIsModalDeleteOpen(true)}
            disabled={loggedInUser?.role !== "admin"}
          >
            <FaTrashAlt className="text-xs" />
            <span className="pl-1">Delete</span>
          </button>
          <button
            className="flex items-center h-8 px-4 text-sm font-medium text-blue-700 hover:text-white ring-1 ring-blue-700 hover:bg-blue-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
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
