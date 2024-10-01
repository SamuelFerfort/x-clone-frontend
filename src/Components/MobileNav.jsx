import { NavLink } from "react-router-dom";
import { User, Bookmark, Bell, LogOut, Search, House } from "lucide-react";
import { useAuth } from "../contexts/AuthProvider";

const SIZE = 28
export default function MobileNav() {
  const { user, logout } = useAuth();

  
  const NavIcon = ({ icon: Icon, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "text-white" : "text-gray-500")}
    >
      {({ isActive }) => {
        if (Icon === Search) {
          return <Icon strokeWidth={isActive ? 3 : 2} size={SIZE} />;
        }
        if (Icon === House) {
          return (
            <Icon className={isActive ? "fill-white" : ""} strokeWidth={2} size={SIZE} />
          );
        }
        return <Icon className={isActive ? "fill-white" : ""}  size={SIZE} />;
      }}
    </NavLink>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/20 flex justify-around py-3 text-white">
      <NavIcon icon={House} to="/home"  />

      <NavIcon icon={Search} to="/explore" />
      <NavIcon icon={Bell} to="/notifications" />
      <NavIcon icon={Bookmark} to="/bookmarks" />
      <NavIcon icon={User} to={`/${user.handler}`} />
      <button onClick={logout} className="text-gray-500">
        <LogOut />
      </button>
    </nav>
  );
}
