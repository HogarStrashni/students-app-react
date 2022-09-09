import React from "react";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import { classButton, classForm } from "../service/tailwindCSS";

const StudentFormValidation = ({
  studentFormHandler,
  closeFormHandler,
  changeInputHandler,
  stateForm,
  validInput,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <form
      onSubmit={studentFormHandler}
      className="px-4 pt-6 pb-9 mx-auto my-auto bg-white rounded-lg shadow-sm"
    >
      {formTagValue.map((item, index) => {
        return (
          <div
            key={index}
            className={`w-[30rem] mx-auto py-2 flex justify-center items-start ${
              index === 0 || index === 1 ? "mb-5" : null
            }`}
          >
            <label
              htmlFor={item}
              className="w-32 mt-1.5 text-sm font-medium text-gray-500 capitalize"
            >
              {formPlaceVal[index]}:
            </label>
            <div>
              <input
                type="text"
                className={`w-80 py-1 pl-4 text-gray-900 bg-white border border-gray-300 outline-none focus:ring-1 ring-blue-500 hover:bg-gray-50 placeholder:font-normal placeholder:text-sm disabled:bg-gray-200 shadow-sm rounded-lg ${
                  (item === "indexNumber" &&
                    !validInput.indexNum &&
                    stateForm.indexNumber) ||
                  (item === "email" && !validInput.email && stateForm.email) ||
                  (item === "phone" && !validInput.phoneNum && stateForm.phone)
                    ? "ring-red-500 focus:border-red-500"
                    : "ring-blue-500 focus:border-blue-500"
                }`}
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
              {item === "indexNumber" && (
                <p
                  className={`${classForm.messageError(
                    !validInput.indexNum && stateForm.indexNumber
                  )}`}
                >
                  Type valid index number!{" "}
                  <span className="font-medium italic">(##-####)</span>
                </p>
              )}
              {item === "email" && (
                <p
                  className={`${classForm.messageError(
                    !validInput.email && stateForm.email
                  )}`}
                >
                  Type valid email addres!{" "}
                  <span className="font-medium italic">
                    (example@example.com)
                  </span>
                </p>
              )}
              {item === "phone" && (
                <p
                  className={`${classForm.messageError(
                    !validInput.phoneNum && stateForm.phone
                  )}`}
                >
                  Type valid contact phone!{" "}
                  <span className="font-medium italic">
                    (+### ## ### ###(#))
                  </span>
                </p>
              )}
            </div>
          </div>
        );
      })}
      <div className="flex justify-center mt-16">
        <button
          className={`mr-3 px-11 ${classButton.secondaryGray}`}
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
          className={`px-3 ${classButton.secondaryBlue} ${classButton.secondaryDisabled}`}
          disabled={
            !validInput.indexNum || !validInput.email || !validInput.phoneNum
          }
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
  );
};

export default StudentFormValidation;
