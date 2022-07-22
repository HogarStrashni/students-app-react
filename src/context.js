import React, { useState, useEffect, useContext } from "react";
import { getAllStudents } from "./data/data";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getAllStudents);
  }, []);

  return (
    <AppContext.Provider value={{ students, setStudents }}>
      {children}
    </AppContext.Provider>
  );
};

//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};
