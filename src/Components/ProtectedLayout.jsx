import { useAuth } from "../contexts/AuthProvider";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
