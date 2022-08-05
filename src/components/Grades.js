import React from "react";
import GradesForm from "./GradesForm";
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
        {isEditGradeOpen ? (
          <GradesForm
            allGrades={allGrades}
            studentId={studentId}
            setIsEditGradeOpen={setIsEditGradeOpen}
          />
        ) : (
          allGrades.map((item, index) => {
            const { subject, grade, dateExam } = item;
            return (
              <div key={index}>
                <table>
                  <tbody>
                    <tr>
                      <td className="w-96 border">{subject}</td>
                      <td className="w-32 border text-center">{grade}</td>
                      <td className="w-32 border text-center">{dateExam}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })
        )}
      </div>
      {!isEditGradeOpen && (
        <div>
          <button
            className="text-2xl text-slate-500"
            onClick={() => setIsEditGradeOpen(true)}
          >
            <FaEdit />
          </button>
        </div>
      )}
    </section>
  );
};

export default Grades;
