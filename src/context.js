import React from "react";

const AppSearchContext = React.createContext();

const AppProvider = ({ children }) => {
  //USING CONTEXT API for HEADER COMPONENET

  //all students list
  // useEffect(() => {
  //   searchItem
  //     ? setSearchParams({ q: searchItem })
  //     : setSearchParams(undefined);
  // }, [setSearchParams, searchItem]);

  return (
    <AppSearchContext.Provider value={{}}>{children}</AppSearchContext.Provider>
  );
};

export { AppSearchContext, AppProvider };
