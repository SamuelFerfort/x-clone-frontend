import { Outlet, useLocation, Navigate } from "react-router-dom";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSideBar";



export default function X() {
  const location = useLocation();

  


  if (location.pathname === "/") {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <main className="flex min-h-screen ">
     <LeftSidebar />
      <section className="max-w-[600px] ml-[600px] w-full bg-black text-white">
        <Outlet />
      </section>
      <RightSidebar />
    </main>
  );
}
