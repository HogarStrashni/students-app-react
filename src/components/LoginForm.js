import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context";
import { loginUser, registerUser } from "../service/auth";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  //Toaster implementation
  const notifyLoggedIn = () => toast.success("Successfully Logged In");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { loggedInUser, setloggedInUser } = useAuth();

  const [searchParams] = useSearchParams();
  const urlPath = searchParams.get("path") ?? "";

  const loginRegisterHandler = (event) => {
    setErrorMessage("");
    event.preventDefault();
    if (location.pathname === "/login") {
      loginUser({ email, password })
        .then((data) => {
          setloggedInUser(data);
          urlPath ? navigate(`/${urlPath}`) : navigate("/");
          notifyLoggedIn();
        })
        .catch((error) => {
          console.log(error.message);
          setEmail("");
          setPassword("");
          setErrorMessage(error.response.data.message);
        });
    } else {
      registerUser({ email, password, passwordConfirm })
        .then((data) => {
          setloggedInUser(data);
          navigate("/");
          notifyLoggedIn();
        })
        .catch((error) => {
          console.log(error.message);
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
          setErrorMessage(error.response.data.message);
        });
    }
  };

  // Setting error message to null on change route
  useEffect(() => {
    setErrorMessage("");
  }, [navigate]);

  return (
    <>
      <Toaster />
      <article className="w-[100%] h-[calc(100vh-114px)] mx-auto bg-gray-50 flex items-center">
        <div className="flex flex-col px-6 rounded-xl mx-auto bg-white shadow-lg">
          {!loggedInUser && urlPath && (
            <p className="pt-6 text-red-600 text-sm text-center">
              Log In to Complete Action!
            </p>
          )}
          {errorMessage && (
            <p className="pt-6 text-blue-700 text-center text-sm">
              {errorMessage}
            </p>
          )}
          <form className="flex flex-col my-6" onSubmit={loginRegisterHandler}>
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-500 capitalize"
            >
              Email:
            </label>
            <input
              className="w-72 py-1 pl-4 font-medium text-gray-900 bg-white border border-gray-300 outline-none focus:ring-1 ring-blue-500 focus:border-blue-500 hover:bg-gray-50 placeholder:font-normal placeholder:text-sm shadow-sm rounded-lg"
              type="text"
              name="email"
              id="email"
              placeholder="example@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label
              htmlFor="password"
              className="mb-2 mt-6 text-sm font-medium text-gray-500 capitalize"
            >
              Password:
            </label>
            <input
              className="w-72 py-1 pl-4 font-medium text-gray-900 bg-white border border-gray-300 outline-none focus:ring-1 ring-blue-500 focus:border-blue-500 hover:bg-gray-50 placeholder:font-normal placeholder:text-sm shadow-sm rounded-lg"
              type="password"
              name="password"
              id="password"
              placeholder="******"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {location.pathname === "/register" && (
              <>
                <label
                  htmlFor="passwordConfirm"
                  className="mb-2 mt-6 text-sm font-medium text-gray-500 capitalize"
                >
                  Confirm Password:
                </label>
                <input
                  className="w-72 py-1 pl-4 font-medium text-gray-900 bg-white border border-gray-300 outline-none focus:ring-1 ring-blue-500 focus:border-blue-500 hover:bg-gray-50 placeholder:font-normal placeholder:text-sm shadow-sm rounded-lg"
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="******"
                  required
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                />
              </>
            )}
            <div className="flex justify-center mt-16">
              <button className="py-2 px-8 text-sm font-medium text-gray-50 bg-blue-600 hover:text-white border border-blue-500 hover:bg-blue-800 rounded-lg">
                {location.pathname === "/login" ? "Login" : "Register"}
              </button>
            </div>
            {location.pathname === "/login" && (
              <p className="mt-6 text-sm text-center">
                Don't have account?{" "}
                <span
                  className="text-violet-600 font-semibold hover:text-blue-800 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </p>
            )}
          </form>
        </div>
      </article>
    </>
  );
};

export default LoginForm;
