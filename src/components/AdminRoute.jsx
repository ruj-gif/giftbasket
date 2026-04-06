import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ allow admin
  return children;
}