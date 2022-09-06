import React, { useState } from "react";
import GradesForm from "./GradesForm";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../context";
import axiosInstance from "../service/httpClient";
import { formatingIso, isoToLocalDate } from "../service/dateFormating";
import { GiCancel, GiConfirmed } from "react-icons/gi";

const Grades = ({
  student,
  isEditGradeOpen,
  setIsEditGradeOpen,
  studentId,
}) => {
  const { loggedInUser } = useAuth();

  // Conditional for escaping error on loading
  const { gradeHistory } = student ? student : [];

  const [stateGrades, setStateGrades] = useState(
    gradeHistory.map((item) => {
      return {
        subject: item.subject || "",
        grade: item.grade || "",
        dateExam: item.dateExam || "",
      };
    })
  );

  const studentGradeHandler = () => {
    axiosInstance
      .patch(`/student/${studentId}`, {
        gradeHistory: stateGrades,
      })
      .then(() => setIsEditGradeOpen(false))
      .catch((err) => console.log(err.message));
  };

  // Handling Date...
  student.gradeHistory = student.gradeHistory.map((item) => {
    return {
      ...item,
      dateExam: formatingIso(item.dateExam),
      dateExamLocaly: isoToLocalDate(item.dateExam),
    };
  });

  return (
    <section className="w-[60rem] mx-auto mt-5 flex justify-between">
      <div>
        <table>
          <thead>
            <tr className="uppercase text-xs text-gray-700 bg-gray-200 text-left">
              <th className="w-[28rem] py-1 px-6">Subject</th>
              <th className="w-36 py-2 px-6 text-center">Grades</th>
              <th className="w-36 py-2 px-6 text-center">Exam date</th>
            </tr>
          </thead>
        </table>
        {isEditGradeOpen ? (
          <GradesForm
            stateGrades={stateGrades}
            setStateGrades={setStateGrades}
            studentId={studentId}
            setIsEditGradeOpen={setIsEditGradeOpen}
          />
        ) : (
          student.gradeHistory.map((item, index) => {
            const { subject, grade, dateExam, dateExamLocaly } = item;
            return (
              <div
                key={index}
                className="odd:bg-gray-50 uppercase text-[14px] text-gray-900"
              >
                <table>
                  <tbody>
                    <tr>
                      <td className="w-[28rem] py-[5px] px-6 text-xs">
                        {subject}
                      </td>
                      <td className="w-36 py-[5px] px-6 text-center font-medium">
                        {grade}
                      </td>
                      <td className="w-36 py-[5px] px-6 text-center font-medium">
                        {dateExam ? dateExamLocaly : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })
        )}
      </div>
      {!isEditGradeOpen ? (
        <div>
          <button
            className="flex items-center h-8 px-4 text-sm font-medium text-blue-500 hover:text-white ring-1 ring-blue-500 hover:bg-blue-500 rounded-lg
            disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => setIsEditGradeOpen(true)}
            disabled={loggedInUser?.role !== "admin"}
          >
            <FaEdit />
            <span className="pl-1">Edit the Grade list</span>
          </button>
        </div>
      ) : (
        <div className="flex">
          <button
            className="mr-3 flex items-center h-8 px-3 text-sm font-medium text-gray-500 hover:text-white ring-1 ring-gray-500 hover:bg-gray-500 rounded-lg"
            onClick={() => setIsEditGradeOpen(false)}
          >
            <GiCancel />
            <span className="pl-1">Cancel</span>
          </button>
          <button
            className="flex items-center h-8 px-2 text-sm font-medium text-blue-500 hover:text-white ring-1 ring-blue-500 hover:bg-blue-500 rounded-lg"
            onClick={() => studentGradeHandler()}
          >
            <GiConfirmed />
            <span className="pl-1">Confirm</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Grades;
