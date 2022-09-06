import React from "react";
import { TbError404 } from "react-icons/tb";

const ErrorPage = () => {
  return (
    <main>
      <div className="h-[calc(100vh-114px)] w-[100%] bg-gray-100 flex flex-col justify-center items-center">
        <TbError404 className="text-[160px] text-slate-500" />
        <p className="text-2xl mb-4 italic text-slate-500">
          Sorry, the page not found
        </p>
        <p className="mt-4 italic">The link you followed probably broken</p>
        <p className="mb-16 italic">or the page has been removed.</p>
      </div>
    </main>
  );
};

export default ErrorPage;
