import React, { useState } from "react";
import GradesForm from "./GradesForm";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../context";
import axiosInstance from "../service/httpClient";
import { formatingIso, isoToLocalDate } from "../service/dateFormating";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { Toaster } from "react-hot-toast";
import { infoChanged } from "../service/toastLogic";
import { classButton, classForm } from "../service/tailwindCSS";

const Grades = ({
  student,
  isEditGradeOpen,
  setIsEditGradeOpen,
  studentId,
}) => {
  const { loggedInUser } = useAuth();
  const { gradeHistory } = student;
  const [stateGrades, setStateGrades] = useState([]);
  const [errorGradeValue, setErrorGradeValue] = useState(false);

  // Handling Date...
  let gradeHistoryFormatDate = [];
  if (gradeHistory) {
    gradeHistoryFormatDate = gradeHistory.map((item) => {
      return {
        ...item,
        dateExam: formatingIso(item.dateExam),
      };
    });
  }

  const studentGradeHandler = () => {
    axiosInstance
      .patch(`/student/${studentId}`, {
        ...student,
        gradeHistory: stateGrades,
      })
      .then(() => setIsEditGradeOpen(false))
      .then(() => infoChanged("Grade History Successfully Changed"))
      .catch((err) => console.log(err.message));
  };

  return (
    <section className="w-[60rem] mx-auto mt-5 flex justify-between">
      <Toaster />
      <div>
        <div className="bg-blue-200 rounded-t">
          <table>
            <thead>
              <tr className="uppercase text-xs text-gray-700 text-left">
                <th className="w-[28rem] py-1 px-6">Subject</th>
                <th className="w-36 py-2 px-6 text-center">Grades</th>
                <th className="w-36 py-2 px-6 text-center">Exam date</th>
              </tr>
            </thead>
          </table>
        </div>
        {isEditGradeOpen ? (
          <GradesForm
            stateGrades={stateGrades}
            setStateGrades={setStateGrades}
            studentId={studentId}
            setIsEditGradeOpen={setIsEditGradeOpen}
            errorGradeValue={errorGradeValue}
            setErrorGradeValue={setErrorGradeValue}
          />
        ) : (
          gradeHistoryFormatDate.map((item, index) => {
            const { subject, grade, dateExam } = item;
            return (
              <div
                key={index}
                className="odd:bg-gray-50 uppercase text-[14px] text-gray-900 last:rounded-b"
              >
                <table>
                  <tbody>
                    <tr>
                      <td className="w-[28rem] py-[7.5px] px-6 text-xs">
                        {subject}
                      </td>
                      <td className="w-36 py-[5px] px-6 text-center font-medium">
                        {grade ? (
                          grade
                        ) : (
                          <span className="text-xs font-normal italic lowercase text-gray-400">
                            no passed exam
                          </span>
                        )}
                      </td>
                      <td className="w-36 py-[5px] px-6 text-center font-medium">
                        {dateExam ? (
                          isoToLocalDate(dateExam)
                        ) : (
                          <span className="text-xs font-normal italic lowercase text-gray-400">
                            no passed exam
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })
        )}
      </div>
      {!isEditGradeOpen ? (
        <div>
          <button
            className={`px-4 ${classButton.primary}`}
            onClick={() => {
              setStateGrades(gradeHistoryFormatDate);
              setIsEditGradeOpen(true);
            }}
            disabled={loggedInUser?.role !== "admin"}
          >
            <FaEdit />
            <span className="pl-1">Edit the Grade list</span>
          </button>
        </div>
      ) : (
        <div>
          <div className="flex">
            <button
              className={`mr-3 px-[13px] ${classButton.secondaryGray}`}
              onClick={() => {
                setIsEditGradeOpen(false);
                setErrorGradeValue(false);
              }}
            >
              <GiCancel />
              <span className="pl-1">Cancel</span>
            </button>
            <button
              className={`px-2 ${classButton.secondaryBlue} ${classButton.secondaryDisabled}`}
              onClick={studentGradeHandler}
              disabled={errorGradeValue}
            >
              <GiConfirmed />
              <span className="pl-1">Confirm</span>
            </button>
          </div>
          <div className={`mt-4 ${classForm.messageError(errorGradeValue)}`}>
            <p>Grades are not valid!</p>
            <p>Valid values are between 6 and 10.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Grades;
