import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppSearchContext } from "../context";
import { getNewStudent } from "../service/data";

const StudentForm = () => {
  const { setIsFormOpen, setStudents } = useContext(AppSearchContext);

  const navigate = useNavigate();

  const [stateForm, setStateForm] = useState({
    firstName: "",
    lastName: "",
    indexNumber: "",
    email: "",
    phone: "",
  });

  const changeInputHandler = (event) => {
    setStateForm({ ...stateForm, [event.target.name]: event.target.value });
  };

  const [listAddedStudents, setListAddedStudents] = useState(null);

  useEffect(() => {
    getNewStudent(stateForm)
      .then((data) => setListAddedStudents(data))
      .catch((msg) => console.log(msg));
  }, [stateForm]);

  const studentFormHandler = (event) => {
    event.preventDefault();
    setStudents(listAddedStudents);
    setIsFormOpen(false);
    navigate("/");
  };

  const closeFormHandler = () => {
    setIsFormOpen(false);
  };

  console.log(listAddedStudents);

  return (
    <>
      <main className="h-[calc(100vh)] w-[60rem] left-[calc(50vw-30rem)] top-0 mx-auto bg-slate-200 absolute">
        <div className="w-[56rem] mx-auto my-8 flex justify-between">
          <form onSubmit={studentFormHandler}>
            <table className="w-[30rem]">
              <tbody>
                <tr className="h-12">
                  <td>
                    <label htmlFor="first-name">First Name: </label>
                  </td>
                  <td>
                    <input
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
                      type="text"
                      name="phone"
                      id="contact-phone"
                      placeholder="Contact Phone..."
                      value={StudentForm.phone}
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
                onClick={closeFormHandler}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-40 rounded-lg bg-red-300 border-2"
              >
                Add New Student
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default StudentForm;
