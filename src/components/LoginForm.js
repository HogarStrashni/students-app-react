import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { loginUser, registerUser, logoutUser } from "../service/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const loginRegisterHandler = async (event) => {
    event.preventDefault();
    if (location.pathname === "/login") {
      let user = await loginUser({ email, password });
      setUser(user);
    } else {
      let user = await registerUser({ email, password });
      setUser(user);
    }
    navigate("/");
  };

  const logoutHandler = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <>
      <article className="h-[calc(100vh-128px)] w-[56rem] my-3 top-0 mx-auto border bg-slate-600 opacity-10"></article>
      <article className="w-[18rem] h-72 border-2 rounded-lg top-[calc(50%-10rem)] left-[calc(50%-10rem)] bg-white absolute">
        <div className="h-[100%] flex flex-col items-center justify-around">
          <form className="flex flex-col" onSubmit={loginRegisterHandler}>
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
          </form>
        </div>
      </article>
    </>
  );
};

export default LoginForm;
