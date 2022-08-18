import React, { useState } from "react";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import axios from "axios";

const GradesForm = ({ allGrades, setIsEditGradeOpen, studentId }) => {
  const [stateGrades, setStateGrades] = useState(
    allGrades.map((item) => {
      return {
        subject: item.subject || "",
        grade: item.grade || "",
        dateExam: item.dateExam || "",
      };
    })
  );

  const helpFunctionFind = (value) => {
    return stateGrades.find((item) => item.subject === value);
  };

  const gradeDataHandler = (event) => {
    setStateGrades(() =>
      stateGrades.map((item) => {
        return item.subject === event.target.name
          ? { ...item, grade: event.target.value }
          : item;
      })
    );
  };

  const dateDataHandler = (event) => {
    setStateGrades(() =>
      stateGrades.map((item) => {
        return item.subject === event.target.name
          ? { ...item, dateExam: event.target.value }
          : item;
      })
    );
  };

  const studentGradeHandler = () => {
    axios
      .patch(
        `https://students-app-server-plum.vercel.app/api/student/${studentId}`,
        {
          gradeHistory: stateGrades,
        }
      )
      .then(() => setIsEditGradeOpen(false))
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="w-[56rem] flex justify-between">
      <div>
        {stateGrades.map((item, index) => {
          const { subject } = item;
          return (
            <div key={index}>
              <table>
                <tbody>
                  <tr>
                    <td className="w-96 border">
                      <label>{subject}</label>
                    </td>
                    <td className="w-32 border text-center">
                      <input
                        className="w-[100%] text-center border border-blue-500 rounded-md"
                        type="text"
                        name={subject}
                        value={helpFunctionFind(subject).grade}
                        onChange={gradeDataHandler}
                      />
                    </td>
                    <td className="w-32 border text-center">
                      <input
                        className="w-[100%] text-center border border-blue-500 rounded-md"
                        type="text"
                        name={subject}
                        value={helpFunctionFind(subject).dateExam}
                        onChange={dateDataHandler}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <div>
        <button
          className="text-2xl text-red-500"
          onClick={() => setIsEditGradeOpen(false)}
        >
          <GiCancel />
        </button>
        <button
          className="text-2xl pl-3 text-green-500"
          onClick={() => studentGradeHandler()}
        >
          <GiConfirmed />
        </button>
      </div>
    </section>
  );
};

export default GradesForm;
