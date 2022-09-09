import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorStage from "./ErrorStage";
import axiosInstance from "../service/httpClient";
import { useAuth } from "../context";
import { Toaster } from "react-hot-toast";
import { infoChanged } from "../service/toastLogic";
import {
  indexNumberChecker,
  emailChecker,
  phoneNumberChecker,
} from "../service/validation";
import StudentFormValidation from "./StudentFormValidation";

const StudentForm = ({ student, setIsStudentFormOpen, studentId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Setting ErrorStage
  const [isError, setIsError] = useState(false);

  // Validation input fields
  const [validInput, setValidInput] = useState(
    location.pathname === "/student/new-student"
      ? {
          indexNum: false,
          email: false,
          phoneNum: false,
        }
      : {
          indexNum: true,
          email: true,
          phoneNum: true,
        }
  );

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
    // Validation input fields
    event.target.name === "indexNumber" &&
      setValidInput({
        ...validInput,
        indexNum: indexNumberChecker(event.target.value),
      });
    event.target.name === "email" &&
      setValidInput({
        ...validInput,
        email: emailChecker(event.target.value),
      });
    event.target.name === "phone" &&
      setValidInput({
        ...validInput,
        phoneNum: phoneNumberChecker(event.target.value),
      });
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

  // Prevent error on http access
  useEffect(() => {
    if (location.pathname === "/student/new-student") {
      if (!loggedInUser) {
        navigate("/login?path=student/new-student");
      }
      if (loggedInUser && loggedInUser?.role !== "admin") {
        navigate("/");
      }
    }
  }, [location.pathname, loggedInUser, loggedInUser?.role, navigate]);

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
            <StudentFormValidation
              studentFormHandler={studentFormHandler}
              closeFormHandler={closeFormHandler}
              changeInputHandler={changeInputHandler}
              stateForm={stateForm}
              validInput={validInput}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default StudentForm;
