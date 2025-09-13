import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  if (loading) return null; // Optionally, show a loader here
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
