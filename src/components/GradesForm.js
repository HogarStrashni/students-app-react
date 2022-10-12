import React from "react";
import { classForm } from "../assets/tailwindCSS";

const GradesForm = ({ stateGrades, setStateGrades, setErrorGradeValue }) => {
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
    setErrorGradeValue(
      event.target.value && (event.target.value < 6 || event.target.value > 10)
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

  return (
    <section className="flex justify-between">
      <div>
        {stateGrades.map((item, index) => {
          const { subject } = item;
          return (
            <div key={index} className="even:bg-gray-50">
              <table>
                <tbody>
                  <tr className="uppercase text-[14px] text-gray-900">
                    <td className="w-[28rem] py-[5px] px-6 text-xs">
                      <label>{subject}</label>
                    </td>
                    <td className="w-36 text-center">
                      <input
                        className={`w-32 py-[2px] ${
                          classForm.inputGrades
                        } placeholder:text-xs placeholder:italic placeholder:font-normal ${
                          helpFunctionFind(subject).grade &&
                          (helpFunctionFind(subject).grade < 6 ||
                            helpFunctionFind(subject).grade > 10)
                            ? "bg-gray-400"
                            : null
                        }`}
                        type="text"
                        placeholder="no passed exam"
                        name={subject}
                        value={helpFunctionFind(subject).grade}
                        onChange={gradeDataHandler}
                      />
                    </td>
                    <td className="w-36">
                      <input
                        className={`pr-4 my-0.5 py-[1px] ${classForm.inputGrades}`}
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
    </section>
  );
};

export default GradesForm;
