import { Outlet, useLocation, Navigate, NavLink } from "react-router-dom";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSideBar";
import { useEffect, useState } from "react";
import {
  User,
  Bookmark,
  Bell,
  LogOut,
  X as xIcon,
  Search,
  House,
} from "lucide-react";
import HomeSVG from "../Components/HomeSVG";
import { useAuth } from "../contexts/AuthProvider";

export default function X() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { user, logout } = useAuth();
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

  const NavIcon = ({ icon: Icon, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "text-white" : "text-gray-500")}
    >
      {({ isActive }) => {
        if (Icon === Search) {
          return <Icon strokeWidth={isActive ? 3 : 2} />;
        }
        if (Icon === House) {
          return (
            <Icon
              className={isActive ? "fill-white" : ""}
              strokeWidth={2}
            />
          );
        }
        return <Icon className={isActive ? "fill-white" : ""} />;
      }}
    </NavLink>
  );

  return (
    <main className="flex min-h-screen bg-black">
      <LeftSidebar />
      <section className="sm:max-w-[600px] sm:ml-[600px] w-full flex-grow bg-black text-white">
        <Outlet />
      </section>
      {!isMobile && <RightSidebar />}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/20 flex justify-around py-2 text-white">
          <NavIcon icon={House} to="/home" />

          <NavIcon icon={Search} to="/explore" />
          <NavIcon icon={Bell} to="/notifications" />
          <NavIcon icon={Bookmark} to="/bookmarks" />
          <NavIcon icon={User} to={`/${user.handler}`} />
          <button onClick={logout} className="text-gray-500">
            <LogOut />
          </button>
        </nav>
      )}
    </main>
  );
}
