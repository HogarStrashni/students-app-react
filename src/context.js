import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [logError, setLogError] = useState("");

  return (
    <AuthContext.Provider
      value={{ loggedUser, setLoggedUser, logError, setLogError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
