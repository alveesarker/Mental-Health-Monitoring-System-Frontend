/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }: any) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
