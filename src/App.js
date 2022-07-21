import React, { useState } from "react";
import { getAllStudents } from "./data/data";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState(getAllStudents);

  return (
    <main className="w-[56rem] mx-auto my-4">
      <StudentList students={students} />
    </main>
  );
}

export default App;
