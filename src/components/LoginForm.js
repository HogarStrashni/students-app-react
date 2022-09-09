import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context";
import { loginUser, registerUser } from "../service/auth";
import { Toaster } from "react-hot-toast";
import { infoChanged } from "../service/toastLogic";
import LoginFormValidation from "./LoginFormValidation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Loading spinner
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { loggedInUser, setloggedInUser } = useAuth();

  const [searchParams] = useSearchParams();
  const urlPath = searchParams.get("path") ?? "";

  const loginRegisterHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoadingSpinner(true);
    if (location.pathname === "/login") {
      loginUser({ email, password })
        .then((data) => {
          setloggedInUser(data);
          urlPath ? navigate(`/${urlPath}`) : navigate("/");
        })
        .then(() => {
          infoChanged("Successfully Logged In");
          setLoadingSpinner(false);
        })
        .catch((error) => {
          console.log(error.message);
          setEmail("");
          setPassword("");
          setErrorMessage(error.response.data.message);
          setLoadingSpinner(false);
        });
    } else {
      registerUser({ email, password, passwordConfirm })
        .then((data) => {
          setloggedInUser(data);
          navigate("/");
        })
        .then(() => {
          infoChanged("Successfully Logged In");
          setLoadingSpinner(false);
        })
        .catch((error) => {
          console.log(error.message);
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
          setErrorMessage(error.response.data.message);
          setLoadingSpinner(false);
        });
    }
  };

  // Setting error message to null on change route
  useEffect(() => {
    setErrorMessage("");
  }, [navigate]);

  return (
    <article className="w-[100%] h-[calc(100vh-114px)] mx-auto bg-gray-50 flex items-center">
      <Toaster />
      <div className="flex flex-col px-6 rounded-xl mx-auto bg-white shadow-lg">
        {!loggedInUser && urlPath && (
          <p className="pt-6 text-blue-600 text-sm text-center">
            Log In to Complete Action!
          </p>
        )}
        {errorMessage && (
          <p className="pt-6 text-red-500 text-center text-sm">
            {errorMessage}
          </p>
        )}
        <LoginFormValidation
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          passwordConfirm={passwordConfirm}
          setPasswordConfirm={setPasswordConfirm}
          loginRegisterHandler={loginRegisterHandler}
          loadingSpinner={loadingSpinner}
        />
      </div>
    </article>
  );
};

export default LoginForm;
