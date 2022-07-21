import React, { useState } from "react";
import { getAllStudents } from "./data/data";
import StudentList from "./components/StudentList";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [students, setStudents] = useState(getAllStudents);

  return (
    <>
      <Header />
      <main className="w-[56rem] mx-auto my-3">
        <StudentList students={students} />
      </main>
      <Footer />
    </>
  );
}

export default App;
