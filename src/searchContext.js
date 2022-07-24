import React, { useState, useEffect } from "react";
import { getFilteredStudents } from "./service/data";

const AppSearchContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchItem, setSearchItem] = useState("");
  const [filteredStudents, setFilteredStudents] = useState({});

  useEffect(() => {
    getFilteredStudents(searchItem)
      .then((data) => setFilteredStudents(data))
      .catch((msg) => console.log(msg));
  }, [searchItem]);

  return (
    <AppSearchContext.Provider
      value={{
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
