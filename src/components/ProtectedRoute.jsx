import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { userRole, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  // Not logged in
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // Logged in but wrong role
  if (userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // Correct role
  return children;
};

export default ProtectedRoute;
