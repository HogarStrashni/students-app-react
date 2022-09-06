import React, { useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import Pagination from "./Pagination";

const AllStudentsList = ({
  listStudents,
  currentPage,
  totalPages,
  queryPart,
  limitNumber,
}) => {
  const navigate = useNavigate();

  // For table scroll bar
  const referTbody = useRef();
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(true);

  useLayoutEffect(() => {
    let heightTab = referTbody.current.offsetHeight;
    setIsScrollbarVisible(heightTab > window.innerHeight - 262);
  }, [listStudents]);

  const { loggedInUser } = useAuth();

  return (
    <main className="h-[calc(100vh-196px)]">
      <div className="w-[66rem] mx-auto rounded-t-lg bg-blue-300 shadow-md">
        <table className="mx-auto text-sm text-left">
          <thead className="text-[11px] text-gray-700 uppercase">
            <tr className="text-gray-900">
              <th className="w-24 py-2 px-8">No.</th>
              <th className="w-36 py-2 px-6">First Name</th>
              <th className="w-40 py-2 px-6">Last Name</th>
              <th className="w-40 py-2 px-6">Index Number</th>
              <th className="w-80 py-2 px-6">E-mail</th>
              <th className="w-44 py-2 pl-6">Contact Phone</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="w-[66rem] max-h-[calc(100vh-276px)] overflow-auto mx-auto shadow-md rounded-b-lg">
        <table className="mx-auto text-sm text-left text-gray-500">
          <tbody ref={referTbody}>
            {listStudents.map((item, index) => {
              const { firstName, lastName, indexNumber, email, phone } = item;
              return (
                <tr
                  onClick={() =>
                    loggedInUser
                      ? navigate(`/student/${item.indexNumber}`)
                      : navigate(`/login?path=student/${item.indexNumber}`)
                  }
                  key={item.indexNumber}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-100 cursor-pointer text-gray-900"
                >
                  <td className="w-24 px-8">
                    {(currentPage - 1) * limitNumber + index + 1}.
                  </td>
                  <td className="w-36 py-2 px-6">{firstName}</td>
                  <td className="w-40 py-2 px-6">{lastName}</td>
                  <td className="w-40 py-2 px-6">{indexNumber}</td>
                  <td className="w-80 py-2 px-6">{email}</td>
                  <td
                    className="w-44 py-2 pl-6"
                    style={{
                      width: isScrollbarVisible
                        ? "calc(11rem - 17px)"
                        : "11rem",
                    }}
                  >
                    {phone}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        queryPart={queryPart}
        limitNumber={limitNumber}
      />
    </main>
  );
};

export default AllStudentsList;
