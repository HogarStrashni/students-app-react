import React, { useState } from "react";

const AppSearchContext = React.createContext();

const AppProvider = ({ children }) => {
  //implementing search from header component
  const [searchItem, setSearchItem] = useState("");

  return (
    <AppSearchContext.Provider
      value={{
        searchItem,
        setSearchItem,
      }}
    >
      {children}
    </AppSearchContext.Provider>
  );
};

export { AppSearchContext, AppProvider };
