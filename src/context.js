import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setloggedInUser] = useState(null);

  return (
    <AuthContext.Provider value={{ loggedInUser, setloggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
