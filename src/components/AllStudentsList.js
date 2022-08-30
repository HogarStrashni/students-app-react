import React, { useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import Pagination from "./Pagination";

const AllStudentsList = ({ listStudents, currentPage, totalPages }) => {
  //table scroll bar
  const referTbody = useRef();
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(true);

  useLayoutEffect(() => {
    let heightTab = referTbody.current.offsetHeight;
    setIsScrollbarVisible(heightTab > window.innerHeight - 162);
  }, [listStudents]);

  //<Link> replacment for table error!
  const navigate = useNavigate();

  const { loggedInUser } = useAuth();

  return (
    <div className="h-[calc(100vh-182px)]">
      <table className="border">
        <tbody>
          <tr className="border">
            <th className="border text-left w-12">No.</th>
            <th className="border text-left w-32">First Name</th>
            <th className="border text-left w-32">Last Name</th>
            <th className="border text-left w-32">Index Number</th>
            <th className="border text-left w-[19rem]">E-mail</th>
            <th className="border text-left w-40">Contact Phone</th>
          </tr>
        </tbody>
      </table>
      <div className="overflow-auto">
        <table className="border">
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
                  className="odd:bg-white even:bg-slate-100 hover:bg-green-300 cursor-pointer"
                >
                  <td className="w-12 border">
                    {(currentPage - 1) * 20 + index + 1}.
                  </td>
                  <td className="w-32 border">{firstName}</td>
                  <td className="w-32 border">{lastName}</td>
                  <td className="w-32 border">{indexNumber}</td>
                  <td className="w-[19rem] border">{email}</td>
                  <td
                    className="border"
                    style={{
                      width: isScrollbarVisible
                        ? "calc(10rem - 17px)"
                        : "10rem",
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
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default AllStudentsList;
