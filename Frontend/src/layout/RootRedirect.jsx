import { Navigate } from "react-router-dom";
import { useAuthContext } from "../auth/AuthContext";

export default function RootRedirect() {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/employee/dashboard" replace />;
}
