import { Navigate } from "react-router-dom";
import { useAuthContext } from "../auth/AuthContext";


export default function ProtectedRoute({ children, roles }) {
  const { user, loading, isAuthenticated } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
