import React, { useState } from "react";
import { getAllStudents } from "./data";

function App() {
  const [students, setStudents] = useState(getAllStudents);

  return (
    <main>
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Index Number</th>
            <th>E-mail</th>
            <th>Contact Phone</th>
          </tr>
          {students.map((item) => {
            const { firstName, lastName, indexNumber, email, phone } = item;
            return (
              <tr key={indexNumber}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{indexNumber}</td>
                <td>{email}</td>
                <td>{phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default App;
