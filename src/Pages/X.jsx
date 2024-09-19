import { Outlet, useLocation, Navigate } from "react-router-dom";
import LeftSidebar from "../Components/LeftSidebar";



export default function X() {
  const location = useLocation();

  


  if (location.pathname === "/") {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <main className="flex h-screen border-t border-white/20">
     <LeftSidebar />
      <section className="max-w-[600px] w-full bg-black text-white">
        <Outlet />
      </section>
      <div className="flex-grow bg-black border-l border-white/20"></div>
    </main>
  );
}
