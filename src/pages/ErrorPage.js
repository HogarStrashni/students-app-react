import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from "../service/logo.png";

const Error = () => {
  return (
    <>
      <header className="w-[60rem] h-16 mx-auto bg-slate-300 flex justify-between items-center">
        <div className="h-16 py-3 px-4">
          <img src={logo} alt="logo" className="h-10 rounded-lg" />
        </div>

        <Link to="/" className="text-3xl mr-4 text-slate-100">
          <FaHome />
        </Link>
      </header>
      <main className="w-[56rem] mx-auto my-3">
        <div className="h-[calc(100vh-136px)] w-[100%]">
          <h2 className="text-3xl bg-green-200">Error</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
            praesentium provident ratione nesciunt quo magni ad reiciendis, et
            fugit, error nobis a voluptatum temporibus iste illo dignissimos
            tempora ab eum repellat doloribus unde ipsam recusandae. Sequi iste
            rerum quae officia enim commodi accusamus adipisci nulla. Eius,
            doloribus itaque. Architecto, quasi.
          </p>
          <Link to="/" className="text-3xl bg-green-200">
            HOME PAGE
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Error;
