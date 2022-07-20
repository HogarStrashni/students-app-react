import React, { useState } from "react";
import { getAllStudents } from "./data";
import StudentList from "./StudentList";

function App() {
  const [students, setStudents] = useState(getAllStudents);

  return (
    <main className="w-[53rem] mx-auto my-4">
      <StudentList students={students} />
    </main>
  );
}

export default App;
