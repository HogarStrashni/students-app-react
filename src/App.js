import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import Home from "./pages/Home";
import SingleStudent from "./pages/SingleStudent";
import Documentation from "./pages/Documentation";
import AboutUs from "./pages/AboutUs";
import ErrorPage from "./pages/ErrorPage";
import StudentForm from "./components/StudentForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route>
              <Route path="/student/:id" element={<SingleStudent />} />
              <Route path="/student/new-student" element={<StudentForm />} />
            </Route>
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
