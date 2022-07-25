import React from "react";
import StudentList from "./components/StudentList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppProvider } from "./searchContext";

function App() {
  return (
    <>
      <AppProvider>
        <Header />
        <main className="w-[56rem] mx-auto my-3">
          <StudentList />
        </main>
      </AppProvider>
      <Footer />
    </>
  );
}

export default App;
