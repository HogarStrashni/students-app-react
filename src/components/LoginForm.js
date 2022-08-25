import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context";
import { axiosInstance } from "../service/axiosInstance";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  const { setUser } = useAuth();

  const endpoint = location.pathname === "/login" ? "Login" : "Register";

  const submitLRHandler = (event) => {
    event.preventDefault();
    axiosInstance
      .post(endpoint, {
        email,
        password,
      })
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <article className="h-[calc(100vh-128px)] w-[56rem] my-3 top-0 mx-auto border bg-slate-600 opacity-10"></article>
      <article className="w-[18rem] h-72 border-2 rounded-lg top-[calc(50%-10rem)] left-[calc(50%-10rem)] bg-white absolute">
        <div className="h-[100%] flex flex-col items-center justify-around">
          <form action="" className="flex flex-col" onSubmit={submitLRHandler}>
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
                {endpoint}
              </button>
            </div>
          </form>
        </div>
      </article>
    </>
  );
};

export default LoginForm;
