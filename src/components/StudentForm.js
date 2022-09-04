import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorStage from "./ErrorStage";
import axiosInstance from "../service/httpClient";
import { useAuth } from "../context";
import { GiCancel, GiConfirmed } from "react-icons/gi";

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

  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (
      location.pathname === "/student/new-student" &&
      loggedInUser?.role !== "admin"
    ) {
      navigate("/");
    }
  }, [location.pathname, loggedInUser?.role, navigate]);

  const formTagValue = [
    "firstName",
    "lastName",
    "indexNumber",
    "email",
    "phone",
  ];
  const formPlaceVal = [
    "First Name",
    "Last Name",
    "Index Number",
    "E-mail",
    "Contact Phone",
  ];

  return isError ? (
    <ErrorStage setIsError={setIsError} />
  ) : (
    <>
      <main className="h-[calc(100vh-114px)] mx-auto bg-white">
        <div className="h-[90%] mx-auto my-auto flex justify-between items-center">
          {loggedInUser?.role === "admin" && (
            <form onSubmit={studentFormHandler} className="w-[40rem] mx-auto">
              {formTagValue.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[30rem] mx-auto py-3 flex justify-center items-center"
                  >
                    <label
                      htmlFor={item}
                      className="w-32 text-sm font-medium text-gray-500 capitalize"
                    >
                      {formPlaceVal[index]}:
                    </label>
                    <input
                      type="text"
                      className="w-80 py-1 pl-4 font-medium text-gray-900 bg-white border border-gray-300 outline-none focus:ring-1 ring-blue-500 focus:border-blue-500 hover:bg-gray-50 placeholder:font-normal placeholder:text-sm shadow-sm rounded-lg"
                      name={item}
                      id={item}
                      placeholder={`${formPlaceVal[index]}...`}
                      value={stateForm[item]}
                      onChange={changeInputHandler}
                      required
                    />
                  </div>
                );
              })}
              <div className="flex justify-center mt-16">
                <button
                  className="mr-3 flex items-center h-8 px-11 text-sm font-medium text-red-500 hover:text-white ring-1 ring-red-500 hover:bg-red-500 rounded-lg"
                  type="button"
                  onClick={
                    location.pathname === "/student/new-student"
                      ? () => navigate("/")
                      : closeFormHandler
                  }
                >
                  <GiCancel />
                  <span className="pl-1">Cancel</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center h-8 px-3 text-sm font-medium text-green-500 hover:text-white ring-1 ring-green-500 hover:bg-green-500 rounded-lg"
                >
                  <GiConfirmed />
                  <span className="pl-1">
                    {location.pathname === "/student/new-student"
                      ? "Add New Student"
                      : "Confirm Changes"}
                  </span>
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
