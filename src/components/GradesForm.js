import React, { useState } from "react";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import axiosInstance from "../service/httpClient";

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
    axiosInstance
      .patch(`/student/${studentId}`, {
        gradeHistory: stateGrades,
      })
      .then(() => setIsEditGradeOpen(false))
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="w-[56rem] flex justify-between">
      <div>
        {stateGrades.map((item, index) => {
          const { subject } = item;
          return (
            <div key={index} className="even:bg-gray-50">
              <table>
                <tbody>
                  <tr className="uppercase text-[14px] text-gray-900 border-b">
                    <td className="w-[28rem] py-1 px-6 text-xs">
                      <label>{subject}</label>
                    </td>
                    <td className="w-36 text-center">
                      <input
                        className="w-32 py-[1px] font-medium text-center border border-blue-700 rounded-lg"
                        type="text"
                        name={subject}
                        value={helpFunctionFind(subject).grade}
                        onChange={gradeDataHandler}
                      />
                    </td>
                    <td className="w-36">
                      <input
                        className="pr-6 my-[2px] font-medium text-right border border-blue-700 rounded-lg"
                        type="date"
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
