import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import Home from "./pages/Home";
import SingleStudent from "./pages/SingleStudent";
import Documentation from "./pages/Documentation";
import AboutUs from "./pages/AboutUs";
import ErrorPage from "./pages/ErrorPage";
import StudentForm from "./components/StudentForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route>
            <Route path="/student/:id" element={<SingleStudent />} />
            <Route path="/student/new-student" element={<StudentForm />} />
          </Route>
          <Route>
            <Route path="/register" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
