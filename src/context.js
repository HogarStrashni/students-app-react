import React, { useContext } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  //for login LATER
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

// Create custom hook
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
