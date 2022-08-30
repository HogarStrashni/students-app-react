import React from "react";
import { TbError404 } from "react-icons/tb";

const ErrorPage = () => {
  return (
    <main className="w-[56rem] mx-auto my-3">
      <div className="h-[calc(100vh-128px)] w-[100%] bg-slate-200 flex flex-col justify-center items-center">
        <TbError404 className="text-[160px] text-slate-500" />
        <p className="text-3xl mb-4 italic text-slate-500">
          Sorry, the page not found
        </p>
        <p className="text-xl mt-4 italic">
          The link you followed probably broken
        </p>
        <p className="text-xl mb-16 italic">or the page has been removed.</p>
      </div>
    </main>
  );
};

export default ErrorPage;
