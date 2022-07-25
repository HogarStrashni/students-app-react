import React, { useState, useEffect } from "react";
import { getAllStudents, getFilteredStudents } from "./service/data";

const AppSearchContext = React.createContext();

const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredStudents, setFilteredStudents] = useState({});

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

  return (
    <AppSearchContext.Provider
      value={{
        students,
        searchItem,
        filteredStudents,
        setSearchItem,
      }}
    >
      {children}
    </AppSearchContext.Provider>
  );
};

export { AppSearchContext, AppProvider };
