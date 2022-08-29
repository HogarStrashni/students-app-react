import React from "react";
import { useNavigate } from "react-router-dom";
import errorPicture from "../service/xerror404.jpg";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <main className="w-[56rem] mx-auto my-3">
      <div className="h-[calc(100vh-128px)] w-[100%]">
        <img
          src={errorPicture}
          alt="Error 404 from net"
          className="w-[100%] h-[100%] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
    </main>
  );
};

export default ErrorPage;
