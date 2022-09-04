import React from "react";

const GradesForm = ({ stateGrades, setStateGrades }) => {
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

  return (
    <section className="flex justify-between">
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
                        className="w-32 py-[1px] font-medium text-center border border-blue-500 hover:bg-gray-100 rounded-lg"
                        type="text"
                        name={subject}
                        value={helpFunctionFind(subject).grade}
                        onChange={gradeDataHandler}
                      />
                    </td>
                    <td className="w-36">
                      <input
                        className="pr-4 my-[2px] font-medium text-center border border-blue-500 hover:bg-gray-100 rounded-lg"
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
