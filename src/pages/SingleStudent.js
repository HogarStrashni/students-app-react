import React from "react";
import { useParams, Link } from "react-router-dom";

const SingleStudent = () => {
  let studentId = useParams();

  return (
    <>
      <div className="text-3xl bg-yellow-200">
        <h1>SingleStudent</h1>
        <h2>broj: {studentId.id}</h2>
      </div>
      <Link to="/" className="text-3xl bg-yellow-200">
        HOME PAGE
      </Link>
    </>
  );
};

export default SingleStudent;
