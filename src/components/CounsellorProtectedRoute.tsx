import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CounsellorProtectedRoute = ({ children }: Props) => {
  const role = localStorage.getItem("role");

  if (role !== "counsellor") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default CounsellorProtectedRoute;
