import React from "react";
import Student from "./Student";

const StudentList = ({ students }) => {
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
      <div className="h-[calc(100vh-162px)] overflow-auto w-[calc(100%+17px)]">
        <table className="border">
          <tbody>
            {students.map((item, index) => {
              let serialNumber = index + 1;
              return (
                <tr
                  key={item.indexNumber}
                  className="odd:bg-white even:bg-slate-100 hover:bg-green-300 cursor-pointer"
                >
                  <td className="w-12 border">{serialNumber}.</td>
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
