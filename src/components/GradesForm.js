import React, { useState } from "react";
import { getEditedGrades } from "../service/data";

const GradesForm = ({ allGrades, studentId, gradeFormHandler }) => {
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

  gradeFormHandler = (event) => {
    event.preventDefault();
    getEditedGrades(studentId, stateGrades).catch((msg) => console.log(msg));
  };

  console.log(stateGrades);

  return (
    <>
      {stateGrades.map((item) => {
        const { subject } = item;
        return (
          <tr key={subject}>
            <td className="w-96 border">
              <label>{subject}</label>
            </td>
            <td className="w-32 border text-center">
              <input
                className="w-[100%] text-center border border-blue-500 rounded-md "
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
        );
      })}
    </>
  );
};

export default GradesForm;
