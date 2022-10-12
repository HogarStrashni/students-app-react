import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { emailChecker, passwordChecker } from "../utils/validation";
import Spinner from "./Spinner";
import { classForm } from "../assets/tailwindCSS";

const LoginFormValidation = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  loginRegisterHandler,
  loadingSpinner,
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
  const emailValid = email && !validInput.email;
  const passValid = password && !validInput.pass;
  const confirmValid = passwordConfirm && !validInput.passConfirm;

  return (
    <form className="flex flex-col my-6" onSubmit={loginRegisterHandler}>
      <label htmlFor="email" className={`${classForm.label}`}>
        Email:
      </label>
      <input
        className={`${classForm.input(emailValid)}`}
        type="text"
        name="email"
        id="email"
        placeholder="example@example.com"
        required
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setValidInput({
            ...validInput,
            email: emailChecker(event.target.value),
          });
        }}
      />
      <p className={`${classForm.messageError(emailValid)}`}>
        Type valid email addres!{" "}
        <span className="font-medium italic">(example@example.com)</span>
      </p>

      <label htmlFor="password" className={`${classForm.label}`}>
        Password:
      </label>
      <input
        className={`${classForm.input(passValid)}`}
        type="password"
        name="password"
        id="password"
        placeholder="******"
        required
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          setValidInput({
            ...validInput,
            pass: passwordChecker(event.target.value),
            passConfirm: passwordConfirm === event.target.value,
          });
        }}
      />
      <p className={`${classForm.messageError(passValid)}`}>
        Password should have a minimum of 4 characters
      </p>

      {location.pathname === "/register" && (
        <>
          <label htmlFor="passwordConfirm" className={`${classForm.label}`}>
            Confirm Password:
          </label>
          <input
            className={`${classForm.input(confirmValid)}`}
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
          <p className={`${classForm.messageError(confirmValid)}`}>
            Make sure your passwords match!
          </p>
        </>
      )}
      <div className="flex justify-center mt-12 py-3">
        {!loadingSpinner ? (
          <button
            className={`${classForm.button}`}
            disabled={
              !validInput.email ||
              !validInput.pass ||
              (location.pathname === "/register" && !validInput.passConfirm) ||
              !email ||
              !password
            }
          >
            {location.pathname === "/login" ? "Login" : "Register"}
          </button>
        ) : (
          <Spinner />
        )}
      </div>
      {location.pathname === "/login" && (
        <p className="mt-2 text-sm text-center">
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
