import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context";
import { loginUser, registerUser } from "../service/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { loggedUser, setLoggedUser } = useAuth();

  const [searchParams] = useSearchParams();
  const urlPath = searchParams.get("path") ?? "";

  const loginRegisterHandler = async (event) => {
    event.preventDefault();
    if (location.pathname === "/login") {
      let user = await loginUser({ email, password });
      setLoggedUser(user);
    } else {
      let user = await registerUser({ email, password });
      setLoggedUser(user);
    }
    urlPath ? navigate(`/${urlPath}`) : navigate("/");
  };

  return (
    <>
      <article className="w-[56rem] h-[calc(100vh-128px)] mx-auto my-3 bg-slate-200 flex items-center">
        <div className="w-72 flex flex-col px-6 rounded-xl mx-auto bg-white">
          {!loggedUser && urlPath && (
            <p className="pt-6 text-red-600 text-center">
              Login for complete action!
            </p>
          )}
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
