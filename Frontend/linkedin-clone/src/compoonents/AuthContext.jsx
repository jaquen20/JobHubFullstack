import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    // Implement your token expiration logic here (e.g., check expiration time)
    return false; // Placeholder; replace with actual logic
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, isTokenExpired }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
