import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const AppSearchContext = React.createContext();

const AppProvider = ({ children }) => {
  //USING CONTEXT API for HEADER COMPONENET

  //implementing searchParams
  const [searchParams, setSearchParams] = useSearchParams();

  //implementig search(funcitonality helper)
  const queryPart = searchParams.get("q") ?? "";
  const [searchItem, setSearchItem] = useState(queryPart);

  //all students list
  useEffect(() => {
    searchItem
      ? setSearchParams({ q: searchItem })
      : setSearchParams(undefined);
  }, [setSearchParams, searchItem]);

  return (
    <AppSearchContext.Provider
      value={{
        searchParams,
        searchItem,
        setSearchItem,
      }}
    >
      {children}
    </AppSearchContext.Provider>
  );
};

export { AppSearchContext, AppProvider };
