import React from "react";
import GradesForm from "./GradesForm";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../context";
import { formatingIso, isoToLocalDate } from "../service/dateFormating";

const Grades = ({
  student,
  isEditGradeOpen,
  setIsEditGradeOpen,
  studentId,
}) => {
  const { loggedInUser } = useAuth();

  //implementing GPA
  const allGradesList = student.gradeHistory
    .map((item) => item.grade)
    .filter((item) => item);
  const numberPassedExam = allGradesList.length;
  const valueGPA =
    numberPassedExam > 0
      ? (
          allGradesList.reduce((acc, item) => (acc += item), 0) /
          numberPassedExam
        ).toFixed(2)
      : "";

  // handling Date...
  student.gradeHistory = student.gradeHistory.map((item) => {
    return {
      ...item,
      dateExam: formatingIso(item.dateExam),
      dateExamLocaly: isoToLocalDate(item.dateExam),
    };
  });

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
            allGrades={student.gradeHistory}
            studentId={studentId}
            setIsEditGradeOpen={setIsEditGradeOpen}
          />
        ) : (
          student.gradeHistory.map((item, index) => {
            const { subject, grade, dateExam, dateExamLocaly } = item;
            return (
              <div key={index}>
                <table>
                  <tbody>
                    <tr>
                      <td className="w-96 border">{subject}</td>
                      <td className="w-32 border text-center">{grade}</td>
                      <td className="w-32 border text-center">
                        {dateExam ? dateExamLocaly : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })
        )}
        <div className="mt-2">
          <table>
            <tbody>
              <tr>
                <td className="w-96 font-bold">
                  GPA (Sum of all grades / Number passed exam):
                </td>
                <td className="w-32 text-center font-extrabold">{valueGPA}</td>
                <td className="w-32 text-center">
                  ({numberPassedExam} {numberPassedExam > 1 ? "Exams" : "Exam"})
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {!isEditGradeOpen && (
        <div>
          <button
            className="text-2xl text-slate-500 disabled:opacity-30"
            onClick={() => setIsEditGradeOpen(true)}
            disabled={loggedInUser?.role !== "admin"}
          >
            <FaEdit />
          </button>
        </div>
      )}
    </section>
  );
};

export default Grades;
