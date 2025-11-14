import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({
  children,
  allowed,
}: {
  children: React.ReactNode;
  allowed: string[];
}) => {
  const { role } = useAuth();

  if (!role || !allowed.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
