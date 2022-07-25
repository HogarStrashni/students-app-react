import React, { useContext } from "react";
import { AppSearchContext } from "../context";

const Grades = () => {
  const { studentGrades } = useContext(AppSearchContext);
  console.log(studentGrades);
  return (
    <div className="w-[56rem] mx-auto my-8">
      <table className="border">
        <tbody>
          <tr>
            <th className="w-96 border text-left">Subject</th>
            <th className="w-32 border">Grades</th>
            <th className="w-32 border">Exam date</th>
          </tr>
        </tbody>
      </table>
      {studentGrades.map((item) => {
        const { subject, grade, dateExam } = item;
        return (
          <table>
            <tbody>
              <tr>
                <td className="w-96 border">{subject}</td>
                <td className="w-32 border text-center">{grade}</td>
                <td className="w-32 border text-center">{dateExam}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default Grades;
