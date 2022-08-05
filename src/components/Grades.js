import React from "react";
import GradesForm from "./GradesForm";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";

const Grades = ({
  allGrades,
  isEditGradeOpen,
  setIsEditGradeOpen,
  studentId,
}) => {
  return (
    <section className="w-[56rem] mx-auto my-8 flex justify-between">
      <div>
        <table className="border">
          <tbody>
            <tr>
              <th className="w-96 border text-left">Subject</th>
              <th className="w-32 border">Grades</th>
              <th className="w-32 border">Exam date</th>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            {isEditGradeOpen ? (
              <GradesForm allGrades={allGrades} studentId={studentId} />
            ) : (
              allGrades.map((item, index) => {
                const { subject, grade, dateExam } = item;
                return (
                  <tr key={index}>
                    <td className="w-96 border">{subject}</td>
                    <td className="w-32 border text-center">{grade}</td>
                    <td className="w-32 border text-center">{dateExam}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {!isEditGradeOpen ? (
        <div>
          <button
            className="text-2xl text-slate-500"
            onClick={() => setIsEditGradeOpen(true)}
          >
            <FaEdit />
          </button>
        </div>
      ) : (
        <div>
          <button
            className="text-2xl text-red-500"
            onClick={() => setIsEditGradeOpen(false)}
          >
            <GiCancel />
          </button>
          <button
            className="text-2xl pl-3 text-green-500"
            onClick={() => console.log("hello world")} //changing
          >
            <GiConfirmed />
          </button>
        </div>
      )}
    </section>
  );
};

export default Grades;
