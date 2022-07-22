import React, { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getAllStudents } from "./service/data";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getAllStudents);
  }, []);

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
