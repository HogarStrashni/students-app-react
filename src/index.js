import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";

import "./index.css";
import App from "./App";

// pages
import SingleStudent from "./pages/SingleStudent";
import ErrorPage from "./pages/ErrorPage";
import Documentation from "./pages/Documentation";
import AboutUs from "./pages/AboutUs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/student/:id" element={<SingleStudent />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
