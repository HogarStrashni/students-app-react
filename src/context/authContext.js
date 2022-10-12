import React, { useContext, useState, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setloggedInUser] = useState(null);

  return (
    <AuthContext.Provider value={{ loggedInUser, setloggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
