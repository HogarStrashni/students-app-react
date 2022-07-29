import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppSearchContext } from "../context";

const StudentForm = () => {
  const { setIsFormOpen, students, setStudents } = useContext(AppSearchContext);

  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const indexNumberRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const closeFormHandler = () => {
    setIsFormOpen(false);
  };

  //checking unique index number
  const isTheSameValue = (value) => {
    return students.some((item) => item.indexNumber === value)
      ? value + " SAME INDEX NUMBER"
      : value;
  };

  const studentFormHandler = (event) => {
    event.preventDefault();
    const newStudentObject = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      indexNumber: isTheSameValue(indexNumberRef.current.value),
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };
    setStudents([...students, newStudentObject]);
    setIsFormOpen(false);
    navigate("/");
  };

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
                      name="first-name"
                      id="first-name"
                      placeholder="First Name..."
                      ref={firstNameRef}
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
                      name="last-name"
                      id="last-name"
                      placeholder="Last Name..."
                      ref={lastNameRef}
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
                      name="index-number"
                      id="index-number"
                      placeholder="Index-Number..."
                      ref={indexNumberRef}
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
                      name="e-mail"
                      id="e-mail"
                      placeholder="E-mail..."
                      ref={emailRef}
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
                      name="contact-phone"
                      id="contact-phone"
                      placeholder="Contact Phone..."
                      ref={phoneRef}
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
