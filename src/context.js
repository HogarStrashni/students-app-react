import React, { useState, useEffect } from "react";
import {
  getAllStudents,
  getFilteredStudents,
  getAllGradeHistory,
} from "./service/data";

const AppSearchContext = React.createContext();

const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredStudents, setFilteredStudents] = useState({});
  const [studentGrades, setStudentGrades] = useState([]);

  useEffect(() => {
    getAllStudents()
      .then((data) => setStudents(data))
      .catch((msg) => console.log(msg));
  }, []);

  useEffect(() => {
    getFilteredStudents(searchItem)
      .then((data) => setFilteredStudents(data))
      .catch((msg) => console.log(msg));
  }, [searchItem]);

  useEffect(() => {
    getAllGradeHistory()
      .then((data) => setStudentGrades(data))
      .catch((msg) => console.log(msg));
  }, []);

  return (
    <AppSearchContext.Provider
      value={{
        students,
        searchItem,
        filteredStudents,
        setSearchItem,
        studentGrades,
      }}
    >
      {children}
    </AppSearchContext.Provider>
  );
};

export { AppSearchContext, AppProvider };
