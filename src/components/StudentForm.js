import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorStage from "./ErrorStage";
import axiosInstance from "../service/httpClient";
import { useAuth } from "../context";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { Toaster } from "react-hot-toast";
import { infoChanged } from "../service/toastLogic";

const StudentForm = ({ student, setIsStudentFormOpen, studentId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Setting ErrorStage
  const [isError, setIsError] = useState(false);

  const { loggedInUser } = useAuth();

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
          .then(() => infoChanged("Successfully Added New Student"))
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
          .then(() => infoChanged("Successfully Changed Student Info"))
          .catch((err) => console.log(err.message));
  };

  const closeFormHandler = () => {
    setIsStudentFormOpen(false);
    navigate(`/student/${studentId}`);
  };

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

  return (
    <>
      <Toaster />
      {isError && (
        <ErrorStage
          setIsError={setIsError}
          stateForm={stateForm}
          setStateForm={setStateForm}
        />
      )}
      <main className="h-[calc(100vh-114px)] mx-auto bg-gray-50">
        <div className="h-[100%] mx-auto my-auto flex justify-between items-center">
          {loggedInUser?.role === "admin" && (
            <form
              onSubmit={studentFormHandler}
              className="px-4 pt-6 pb-9 mx-auto my-auto bg-white rounded-lg shadow-sm"
            >
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
                      className="w-80 py-1 pl-4 text-gray-900 bg-white border border-gray-300 outline-none focus:ring-1 ring-blue-300 focus:border-blue-500 hover:bg-gray-50 placeholder:font-normal placeholder:text-sm disabled:bg-gray-200 shadow-sm rounded-lg"
                      name={item}
                      id={item}
                      placeholder={`${formPlaceVal[index]}...`}
                      value={stateForm[item]}
                      onChange={changeInputHandler}
                      required
                      disabled={
                        (location.pathname !== "/student/new-student") &
                        (item === "indexNumber")
                      }
                    />
                  </div>
                );
              })}
              <div className="flex justify-center mt-16">
                <button
                  className="mr-3 flex items-center h-8 px-11 text-sm font-medium text-gray-500 ring-1 ring-gray-400 hover:bg-gray-100 rounded-lg"
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
                  className="flex items-center h-8 px-3 text-sm font-medium text-white ring-1 bg-blue-500 ring-blue-500 hover:bg-blue-800 rounded-lg"
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
