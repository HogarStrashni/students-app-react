import React from "react";
import Student from "./Student";

const StudentList = ({ students }) => {
  return (
    <table className="border-2">
      <tbody>
        <tr className="border-2">
          <th className="border text-left">No.</th>
          <th className="border text-left">First Name</th>
          <th className="border text-left">Last Name</th>
          <th className="border text-left">Index Number</th>
          <th className="border text-left">E-mail</th>
          <th className="border text-left">Contact Phone</th>
        </tr>
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
  );
};

export default StudentList;
