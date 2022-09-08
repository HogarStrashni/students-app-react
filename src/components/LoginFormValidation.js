import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { emailChecker, passwordChecker } from "../service/validation";

const LoginFormValidation = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  loginRegisterHandler,
}) => {
  // Validation input fields
  const [validInput, setValidInput] = useState({
    email: false,
    pass: false,
    passConfirm: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Repeating variables
  const inputStyle =
    "w-72 py-1 pl-4 text-gray-900 bg-white border border-gray-300 outline-none focus:ring-1 hover:bg-gray-50 placeholder:font-normal placeholder:text-sm shadow-sm rounded-lg";
  const emailValideVar =
    location.pathname === "/register" && email && !validInput.email;
  const passValideVar =
    location.pathname === "/register" && password && !validInput.pass;
  const confirmValideVar = passwordConfirm && !validInput.passConfirm;

  return (
    <form className="flex flex-col my-6" onSubmit={loginRegisterHandler}>
      <label htmlFor="email" className="mb-2 text-sm text-gray-500 capitalize">
        Email:
      </label>
      <input
        className={`${inputStyle} ${
          emailValideVar
            ? "ring-red-500 focus:border-red-500"
            : "ring-blue-500 focus:border-blue-500"
        }`}
        type="text"
        name="email"
        id="email"
        placeholder="example@example.com"
        required
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          location.pathname === "/register" &&
            setValidInput({
              ...validInput,
              email: emailChecker(event.target.value),
            });
        }}
      />
      {emailValideVar && (
        <p className="text-xs text-red-600 pt-1">
          Type valid email addres!{" "}
          <span className="font-medium italic">(example@example.com)</span>
        </p>
      )}
      <label
        htmlFor="password"
        className="mb-2 mt-6 text-sm text-gray-500 capitalize"
      >
        Password:
      </label>
      <input
        className={`${inputStyle} ${
          passValideVar
            ? "ring-red-500 focus:border-red-500"
            : "ring-blue-500 focus:border-blue-500"
        }`}
        type="password"
        name="password"
        id="password"
        placeholder="******"
        required
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          location.pathname === "/register" &&
            setValidInput({
              ...validInput,
              pass: passwordChecker(event.target.value),
              passConfirm: passwordConfirm === event.target.value,
            });
        }}
      />
      {passValideVar && (
        <p className="text-xs text-red-600 pt-1">
          Password should have a minimum of 4 characters
        </p>
      )}

      {location.pathname === "/register" && (
        <>
          <label
            htmlFor="passwordConfirm"
            className="mb-2 mt-6 text-sm text-gray-500 capitalize"
          >
            Confirm Password:
          </label>
          <input
            className={`${inputStyle} ${
              confirmValideVar
                ? "ring-red-500 focus:border-red-500"
                : "ring-blue-500 focus:border-blue-500"
            }`}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="******"
            required
            value={passwordConfirm}
            onChange={(event) => {
              setPasswordConfirm(event.target.value);
              location.pathname === "/register" &&
                setValidInput({
                  ...validInput,
                  passConfirm: event.target.value === password,
                });
            }}
          />
          {confirmValideVar && (
            <p className="text-xs text-red-600 pt-1">
              Make sure your passwords match!
            </p>
          )}
        </>
      )}
      <div className="flex justify-center mt-16 py-3">
        <button
          className="w-72 py-2 text-sm font-medium text-gray-50 bg-blue-600 hover:text-white border border-blue-500 hover:bg-blue-800 rounded-lg disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:border-gray-500"
          disabled={
            location.pathname === "/register" &&
            (!validInput.email ||
              !validInput.pass ||
              !validInput.passConfirm ||
              !email ||
              !password)
          }
        >
          {location.pathname === "/login" ? "Login" : "Register"}
        </button>
      </div>
      {location.pathname === "/login" && (
        <p className="mt-6 text-sm text-center">
          Don't have account?{" "}
          <span
            className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      )}
    </form>
  );
};

export default LoginFormValidation;
