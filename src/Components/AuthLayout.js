import { useAuth } from "../contexts/AuthProvider";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default AuthLayout;
