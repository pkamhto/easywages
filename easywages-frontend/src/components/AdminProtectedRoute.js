import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.category !== "admin") {
    // Agar user admin nahi hai ya logged out hai to admin login page pe bhejo
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
