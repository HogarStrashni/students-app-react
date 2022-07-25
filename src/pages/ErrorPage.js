import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import HeaderDoc from "../components/HeaderDoc";

const Error = () => {
  return (
    <>
      <HeaderDoc />
      <main className="w-[56rem] mx-auto my-3">
        <div className="h-[calc(100vh-156px)] w-[100%]">
          <h2 className="text-3xl bg-green-200 text-center my-8">
            Wrong link!!!
          </h2>
          <div className="h-[80%] flex justify-center items-center">
            <Link to="/" className="text-2xl bg-green-200 text-center">
              HOME PAGE
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Error;
