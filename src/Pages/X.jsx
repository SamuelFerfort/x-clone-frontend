import { Outlet, useLocation, Navigate } from "react-router-dom";

export default function X() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <>
      <h1>X</h1>

      <Outlet />
    </>
  );
}
