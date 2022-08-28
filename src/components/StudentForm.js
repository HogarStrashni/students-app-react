import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorStage from "./ErrorStage";
import axiosInstance from "../service/httpClient";
import { useAuth } from "../context";

const StudentForm = ({ student, setIsStudentFormOpen, studentId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  //setting ErrorStage
  const [isError, setIsError] = useState(false);

  const { firstName, lastName, indexNumber, email, phone } = student
    ? student
    : "";

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
      ? axiosInstance
          .post("/students", {
            firstName: stateForm.firstName,
            lastName: stateForm.lastName,
            indexNumber: stateForm.indexNumber,
            email: stateForm.email,
            phone: stateForm.phone,
          })
          .then(() => navigate("/"))
          .catch((err) => {
            setIsError(true);
            console.log(err.message);
          })
      : axiosInstance
          .patch(`/student/${studentId}`, {
            firstName: stateForm.firstName,
            lastName: stateForm.lastName,
            email: stateForm.email,
            phone: stateForm.phone,
          })
          .then(() => setIsStudentFormOpen(false))
          .catch((err) => console.log(err.message));
  };

  const closeFormHandler = () => {
    setIsStudentFormOpen(false);
    navigate(`/student/${studentId}`);
  };

  const { loggedUser } = useAuth();

  useEffect(() => {
    if (
      location.pathname === "/student/new-student" &&
      loggedUser?.role !== "admin"
    ) {
      navigate("/");
    }
  }, [location.pathname, loggedUser?.role, navigate]);

  return isError ? (
    <ErrorStage setIsError={setIsError} />
  ) : (
    <>
      <main className="h-[calc(100vh-128px)] w-[56rem] mx-auto my-3 pt-8 bg-slate-200">
        <div className="w-[32rem] mx-auto flex justify-between">
          {loggedUser?.role === "admin" && (
            <form onSubmit={studentFormHandler} className="w-[30rem] mx-auto">
              <table className="w-[30rem]">
                <tbody>
                  <tr className="h-12">
                    <td className="w-24">
                      <label htmlFor="firstName">First Name: </label>
                    </td>
                    <td className="w-[15rem]">
                      <input
                        className="w-[100%] rounded-md px-2"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name..."
                        value={stateForm.firstName}
                        onChange={changeInputHandler}
                        required
                      />
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td>
                      <label htmlFor="lastName">Last Name: </label>
                    </td>
                    <td>
                      <input
                        className="w-[100%] rounded-md px-2"
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
                      <label htmlFor="indexNumber">Index-Number: </label>
                    </td>
                    <td>
                      <input
                        className="w-[100%] rounded-md px-2"
                        type="text"
                        name="indexNumber"
                        id="indexNumber"
                        placeholder="Index Number..."
                        value={
                          location.pathname === "/student/new-student"
                            ? stateForm.indexNumber
                            : student.indexNumber
                        }
                        onChange={changeInputHandler}
                        required
                      />
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td>
                      <label htmlFor="email">E-mail: </label>
                    </td>
                    <td>
                      <input
                        className="w-[100%] rounded-md px-2"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="E-mail..."
                        value={stateForm.email}
                        onChange={changeInputHandler}
                        required
                      />
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td>
                      <label htmlFor="contactPhone">Contact Phone: </label>
                    </td>
                    <td>
                      <input
                        className="w-[100%] rounded-md px-2"
                        type="text"
                        name="phone"
                        id="contactPhone"
                        placeholder="Contact Phone..."
                        value={stateForm.phone}
                        onChange={changeInputHandler}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-center w-[30rem] mt-16">
                <button
                  className="w-40 h-8 rounded-lg bg-slate-300 border"
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
                  className="w-40 h-8 rounded-lg bg-red-300 border"
                >
                  {location.pathname === "/student/new-student"
                    ? "Add New Student"
                    : "Confirm Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default StudentForm;
