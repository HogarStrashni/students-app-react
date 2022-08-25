import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
