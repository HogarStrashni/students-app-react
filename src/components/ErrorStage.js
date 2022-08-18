import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorStage = ({ setIsError }) => {
  const navigate = useNavigate();
  return (
    <>
      <article className="h-[calc(100vh-128px)] w-[56rem] my-3 top-0 mx-auto border bg-slate-600 opacity-10"></article>
      <article className="w-[40rem] h-32 border-2 rounded-lg top-[calc(50vh-4rem)] left-[calc(50%-20rem)] bg-white absolute">
        <div className="h-[100%] flex flex-col items-center justify-around">
          <h1 className="text-xl">
            Index Number already exists... Try again with a different value!
          </h1>
          <div className="w-60 flex justify-around">
            <button
              className="w-44 rounded-lg bg-red-300 border-2"
              onClick={() => {
                setIsError(false);
                navigate("/");
              }}
            >
              Back To Home
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default ErrorStage;
