import React, { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getAllStudents } from "./service/data";
import { AppProvider } from "./searchContext";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllStudents()
      .then((data) => setStudents(data))
      .catch((msg) => console.log(msg));
  }, []);

  return (
    <>
      <AppProvider>
        <Header students={students} />
        <main className="w-[56rem] mx-auto my-3">
          <StudentList students={students} />
        </main>
      </AppProvider>
      <Footer />
    </>
  );
}

export default App;
