import React from "react";

const AppSearchContext = React.createContext();

const AppProvider = ({ children }) => {
  //for login LATER
  return (
    <AppSearchContext.Provider value={{}}>{children}</AppSearchContext.Provider>
  );
};

export { AppSearchContext, AppProvider };
