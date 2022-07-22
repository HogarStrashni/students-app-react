import React from "react";
import StudentList from "./components/StudentList";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="w-[56rem] mx-auto my-3">
        <StudentList />
      </main>
      <Footer />
    </>
  );
}

export default App;
