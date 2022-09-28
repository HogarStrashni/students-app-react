import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingStage from "./components/LoadingStage";

//pages
const Home = lazy(() => import("./pages/Home"));
const SingleStudent = lazy(() => import("./pages/SingleStudent"));
const Documentation = lazy(() => import("./pages/Documentation"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const StudentForm = lazy(() => import("./components/StudentForm"));
const LoginForm = lazy(() => import("./components/LoginForm"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<LoadingStage />}>
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
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
