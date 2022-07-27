import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { getAllGradeHistory } from "../service/data";

const Grades = () => {
  const [studentGrades, setStudentGrades] = useState([]);

  useEffect(() => {
    getAllGradeHistory()
      .then((data) => setStudentGrades(data))
      .catch((msg) => console.log(msg));
  }, []);

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
        {studentGrades.map((item, index) => {
          const { subject, grade, dateExam } = item;
          return (
            <table key={index}>
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
      <div>
        <button className="text-2xl text-slate-500">
          <FaEdit />
        </button>
      </div>
    </section>
  );
};

export default Grades;
