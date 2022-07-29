import React, { useState, useEffect } from "react";
import { getAllStudents } from "./service/data";

const AppSearchContext = React.createContext();

const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  //implementing add new student
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    getAllStudents()
      .then((data) => setStudents(data))
      .catch((msg) => console.log(msg));
  }, []);

  return (
    <AppSearchContext.Provider
      value={{
        students,
        setStudents,
        searchItem,
        setSearchItem,
        isFormOpen,
        setIsFormOpen,
      }}
    >
      {children}
    </AppSearchContext.Provider>
  );
};

export { AppSearchContext, AppProvider };
