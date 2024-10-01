import { Outlet, useLocation, Navigate } from "react-router-dom";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSideBar";
import { useEffect, useState } from "react";

import MobileNav from "../Components/MobileNav";

export default function X() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (location.pathname === "/") {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <main className="flex min-h-screen bg-black">
      <LeftSidebar />
      <section className="sm:max-w-[600px] sm:ml-[600px] w-full flex-grow bg-black text-white">
        <Outlet />
      </section>
      {isMobile ? <MobileNav /> : <RightSidebar />}
    </main>
  );
}
