import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isTokenExpired } = useAuth();

  // Redirect to login if not authenticated or if the token is expired
  if (!isAuthenticated || isTokenExpired()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
