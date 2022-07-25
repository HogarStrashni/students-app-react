import React, { useState, useRef, useEffect, useContext } from "react";
import Student from "./Student";
import { useNavigate } from "react-router-dom";
import { AppSearchContext } from "../context";

const StudentList = () => {
  //implementig search
  const { filteredStudents, searchItem, students } =
    useContext(AppSearchContext);

  const dataArray = !searchItem ? students : filteredStudents;

  //table scroll bar
  const referTbody = useRef();
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    let heightTab = referTbody.current.offsetHeight;
    setTableHeight(heightTab);
  }, [dataArray]);

  //<Link> replacment for table error!
  const navigate = useNavigate();

  return (
    <>
      <table className="border">
        <tbody>
          <tr className="border">
            <th className="border text-left w-12">No.</th>
            <th className="border text-left w-32">First Name</th>
            <th className="border text-left w-32">Last Name</th>
            <th className="border text-left w-32">Index Number</th>
            <th className="border text-left w-80">E-mail</th>
            <th className="border text-left w-36">Contact Phone</th>
          </tr>
        </tbody>
      </table>
      <div
        className={`h-[calc(100vh-162px)] overflow-auto w-[calc(${
          tableHeight > window.innerHeight - 162 ? `100%+17px` : `100%`
        })]`}
      >
        <table className="border">
          <tbody ref={referTbody}>
            {dataArray.map((item, index) => {
              return (
                <tr
                  onClick={() => navigate(`/student/${item.indexNumber}`)}
                  key={item.indexNumber}
                  className="odd:bg-white even:bg-slate-100 hover:bg-green-300 cursor-pointer"
                >
                  <td className="w-12 border">{index + 1}.</td>
                  <Student {...item} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentList;
