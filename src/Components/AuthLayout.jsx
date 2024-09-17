import { useAuth } from "../contexts/AuthProvider";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //
  
  if (user) return <Navigate to={from} replace />; 
  
  return <Outlet />;
};

export default AuthLayout;