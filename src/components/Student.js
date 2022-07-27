import React from "react";

const Student = ({
  firstName,
  lastName,
  indexNumber,
  email,
  phone,
  isScrollbarVisible,
}) => {
  return (
    <>
      <td className="w-32 border">{firstName}</td>
      <td className="w-32 border">{lastName}</td>
      <td className="w-32 border">{indexNumber}</td>
      <td className="w-80 border">{email}</td>
      <td
        className="border"
        style={{ width: isScrollbarVisible ? "calc(9rem - 17px)" : "9rem" }}
      >
        {phone}
      </td>
    </>
  );
};

export default Student;
