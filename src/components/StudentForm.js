import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getNewStudent, getEditedStudent } from "../service/data";

const StudentForm = ({
  firstName,
  lastName,
  indexNumber,
  email,
  phone,
  setIsStudentFormOpen,
  studentId,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [stateForm, setStateForm] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    indexNumber: indexNumber || "",
    email: email || "",
    phone: phone || "",
  });

  const changeInputHandler = (event) => {
    setStateForm({ ...stateForm, [event.target.name]: event.target.value });
  };

  const studentFormHandler = (event) => {
    event.preventDefault();
    location.pathname === "/student/new-student"
      ? getNewStudent(stateForm).catch((msg) => console.log(msg))
      : getEditedStudent(studentId, stateForm).catch((msg) => console.log(msg));
    navigate("/");
  };

  const closeFormHandler = () => {
    setIsStudentFormOpen(false);
    navigate("/");
  };

  return (
    <>
      <main className="h-[calc(100vh)] w-[60rem] left-[calc(50vw-30rem)] top-0 bg-slate-200 absolute">
        <div className="w-[56rem] mx-auto my-8 flex justify-between">
          <form onSubmit={studentFormHandler}>
            <table className="w-[45rem]">
              <tbody>
                <tr className="h-12">
                  <td>
                    <label htmlFor="first-name">First Name: </label>
                  </td>
                  <td>
                    <input
                      className="w-[20rem]"
                      type="text"
                      name="firstName"
                      id="first-name"
                      placeholder="First Name..."
                      value={stateForm.firstName}
                      onChange={changeInputHandler}
                      required
                    />
                  </td>
                </tr>
                <tr className="h-12">
                  <td>
                    <label htmlFor="last-name">Last Name: </label>
                  </td>
                  <td>
                    <input
                      className="w-[20rem]"
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name..."
                      value={stateForm.lastName}
                      onChange={changeInputHandler}
                      required
                    />
                  </td>
                </tr>
                <tr className="h-12">
                  <td>
                    <label htmlFor="index-number">Index-Number: </label>
                  </td>
                  <td>
                    <input
                      className="w-[20rem]"
                      type="text"
                      name="indexNumber"
                      id="indexNumber"
                      placeholder="Index-Number..."
                      value={stateForm.indexNumber}
                      onChange={changeInputHandler}
                      required
                    />
                  </td>
                </tr>
                <tr className="h-12">
                  <td>
                    <label htmlFor="e-mail">E-mail: </label>
                  </td>
                  <td>
                    <input
                      className="w-[20rem]"
                      type="text"
                      name="email"
                      id="e-mail"
                      placeholder="E-mail..."
                      value={stateForm.email}
                      onChange={changeInputHandler}
                      required
                    />
                  </td>
                </tr>
                <tr className="h-12">
                  <td>
                    <label htmlFor="contact-phone">Contact Phone: </label>
                  </td>
                  <td>
                    <input
                      className="w-[20rem]"
                      type="text"
                      name="phone"
                      id="contact-phone"
                      placeholder="Contact Phone..."
                      value={stateForm.phone}
                      onChange={changeInputHandler}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center w-[56rem] mt-16">
              <button
                className="w-40 rounded-lg bg-slate-300 border-2"
                type="button"
                onClick={
                  location.pathname === "/student/new-student"
                    ? () => navigate("/")
                    : closeFormHandler
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-40 rounded-lg bg-red-300 border-2"
              >
                {location.pathname === "/student/new-student"
                  ? "Add New Student"
                  : "Confirm Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default StudentForm;
