import React from "react";

const Student = ({ firstName, lastName, indexNumber, email, phone }) => {
  return (
    <>
      <td className="w-32 border">{firstName}</td>
      <td className="w-32 border">{lastName}</td>
      <td className="w-32 border">{indexNumber}</td>
      <td className="w-80 border">{email}</td>
      <td className="w-36 border">{phone}</td>
    </>
  );
};

export default Student;
