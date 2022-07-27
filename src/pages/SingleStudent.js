import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUniqeStudent } from "../service/data";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import Grades from "../components/Grades";
import HeaderDoc from "../components/HeaderDoc";

const SingleStudent = () => {
  const [student, setStudent] = useState({});
  const { id: studentId } = useParams();

  useEffect(() => {
    getUniqeStudent(studentId)
      .then((data) => setStudent(data))
      .catch((msg) => console.log(msg));
  }, [studentId]);

  const { firstName, lastName, indexNumber, email, phone } = student;

  return (
    <>
      <HeaderDoc />
      <section className="w-[56rem] mx-auto my-4 flex justify-between">
        <div className="w-[80%] border">
          <h1>First Name: {firstName}</h1>
          <h1>Last Name: {lastName}</h1>
          <h1>Index Number: {indexNumber}</h1>
          <h1>E-mail: {email}</h1>
          <h1>Contact Phone: {phone}</h1>
        </div>
        <div>
          <button className="text-2xl mr-3 text-slate-500">
            <FaEdit />
          </button>
          <button className="text-2xl text-slate-500">
            <FaTrashAlt />
          </button>
        </div>
      </section>
      <section>
        <Grades />
      </section>
      <Footer />
    </>
  );
};

export default SingleStudent;
