import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { loginUser, registerUser } from "../service/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { setLoggedUser } = useAuth();

  const loginRegisterHandler = (event) => {
    event.preventDefault();
    if (location.pathname === "/login") {
      loginUser({ email, password })
        .then((user) => {
          setLoginError("");
          setLoggedUser(user);
          navigate("/");
        })
        .catch(() => {
          navigate("/login");
          setLoginError("Invalid Email or Password!");
          setEmail("");
          setPassword("");
        });
    } else {
      registerUser({ email, password })
        .then((user) => {
          setLoginError("");
          setLoggedUser(user);
          navigate("/");
        })
        .catch(() => {
          navigate("/register");
          setLoginError("Email Already Exists!");
          setEmail("");
          setPassword("");
        });
    }
  };

  return (
    <>
      <article className="w-[56rem] h-[calc(100vh-128px)] mx-auto my-3 bg-slate-200 flex items-center">
        <div className="w-72 flex flex-col px-6 rounded-xl mx-auto bg-white">
          <p className="pt-6 text-red-600 text-center">{loginError}</p>
          <form className="flex flex-col my-6" onSubmit={loginRegisterHandler}>
            <label htmlFor="email">Email:</label>
            <input
              className="mb-4 mt-2 border-2 rounded-md border-slate-300"
              type="text"
              name="email"
              id="email"
              placeholder="example@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="mb-16 mt-2 border-2 rounded-md border-slate-300"
              type="password"
              name="password"
              id="password"
              placeholder="******"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="w-60 flex justify-around">
              <button className="w-28 rounded-lg bg-green-300 border-2">
                {location.pathname === "/login" ? "Login" : "Register"}
              </button>
            </div>
            {location.pathname === "/login" ? (
              <h2 className="mt-4 text-center">
                Don't have account?{" "}
                <Link to="/register" className="text-blue-800">
                  Register
                </Link>
              </h2>
            ) : null}
          </form>
        </div>
      </article>
    </>
  );
};

export default LoginForm;
