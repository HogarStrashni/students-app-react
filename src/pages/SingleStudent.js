import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUniqeStudent } from "../service/data";
import { FaHome, FaEdit, FaTrashAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import logo from "../service/logo.png";

const SingleStudent = () => {
  const [student, setStudent] = useState({});
  const { id: studentId } = useParams();

  useEffect(() => {
    setStudent(() => getUniqeStudent(studentId));
  }, [studentId]);

  const { firstName, lastName, indexNumber, email, phone } = student;

  return (
    <>
      <header className="w-[60rem] h-16 mx-auto bg-slate-300 flex justify-between items-center">
        <div className="h-16 py-3 px-4">
          <img src={logo} alt="logo" className="h-10 rounded-lg" />
        </div>
        <div className="mr-12">
          <button className="text-3xl mr-4 text-slate-100">
            <FaEdit />
          </button>
          <button className="text-3xl mr-4 text-slate-100">
            <FaTrashAlt />
          </button>
        </div>
        <Link to="/" className="text-3xl mr-4 text-slate-100">
          <FaHome />
        </Link>
      </header>
      <main className="w-[56rem] mx-auto my-3">
        <div className="h-[calc(100vh-136px)] w-[100%]">
          <h1>First Name: {firstName}</h1>
          <h1>Last Name: {lastName}</h1>
          <h1>Index Number: {indexNumber}</h1>
          <h1>E-mail: {email}</h1>
          <h1>Contact Phone: {phone}</h1>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SingleStudent;
