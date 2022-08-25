import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <article className="h-[calc(100vh-128px)] w-[56rem] my-3 top-0 mx-auto border bg-slate-600 opacity-10"></article>
      <article className="w-[18rem] h-72 border-2 rounded-lg top-[calc(50%-10rem)] left-[calc(50%-10rem)] bg-white absolute">
        <div className="h-[100%] flex flex-col items-center justify-around">
          <form
            action=""
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email">Email:</label>
            <input
              className="mb-4 mt-2 border-2 rounded-md border-slate-300"
              type="text"
              name="email"
              id="email"
              placeholder="example@example.com"
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              className="mb-16 mt-2 border-2 rounded-md border-slate-300"
              type="text"
              name="password"
              id="password"
              placeholder="******"
              required
            />
            <div className="w-60 flex justify-around">
              <button
                className="w-28 rounded-lg bg-slate-300 border-2"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
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
