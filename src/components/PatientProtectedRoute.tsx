import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PatientProtectedRoute = ({ children }: Props) => {
  const role = localStorage.getItem("role");

  if (role !== "patient") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PatientProtectedRoute;
