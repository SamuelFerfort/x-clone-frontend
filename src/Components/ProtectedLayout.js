import { useAuth } from "../contexts/AuthProvider";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedLayout = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedLayout;
