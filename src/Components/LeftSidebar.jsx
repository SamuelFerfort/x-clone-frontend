import { NavLink } from "react-router-dom";
import { User, Bookmark, Mail, Bell } from "lucide-react";
import HomeSVG from "./HomeSVG";

export default function LeftSidebar() {
  return (
    <aside className="w-[600px]  bg-black  border-r border-white/20 ">
      <nav className="flex">
        <ul className="text-white flex flex-col  pt-16 pl-[330px]  text-xl space-y-3 flex-end">
          <li className="hover:bg-gray-hover p-3 rounded-full transition-colors duration-200">
            <NavLink
              className={({ isActive }) =>
                `flex items-center space-x-4 ${isActive ? "font-bold" : ""}`
              }
              to="/home"
            >
              {({ isActive }) => (
                <>
                  <HomeSVG
                    size={28}
                    color={isActive ? "white" : "black"}
                    isActive={isActive}
                  />
                  <span>Home</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="hover:bg-gray-hover p-3 rounded-full transition-colors duration-200">
            <NavLink
              className={({ isActive }) =>
                `flex items-center space-x-4 ${isActive ? "font-bold" : ""}`
              }
              to="/profile"
            >
              {({ isActive }) => (
                <>
                  <User className={isActive ? "fill-white" : ""} size={28} />
                  <span>Profile</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="hover:bg-gray-hover p-3 rounded-full transition-colors duration-200">
            <NavLink
              className={({ isActive }) =>
                `flex items-center space-x-4 ${isActive ? "font-bold" : ""}`
              }
              to="/bookmarks"
            >
              {({ isActive }) => (
                <>
                  <Bookmark
                    className={isActive ? "fill-white" : ""}
                    size={28}
                  />
                  <span>Bookmarks</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="hover:bg-gray-hover p-3 rounded-full transition-colors duration-200">
            <NavLink
              className={({ isActive }) =>
                `flex items-center space-x-4 ${isActive ? "font-bold" : ""}`
              }
              to="/messages"
            >
              {({ isActive }) => (
                <>
                  <Mail className={isActive ? "fill-white" : ""} size={28} />
                  <span>Messages</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="hover:bg-gray-hover p-3  rounded-full transition-colors duration-200">
            <NavLink
              className={({ isActive }) =>
                `flex items-center space-x-4 ${isActive ? "font-bold" : ""}`
              }
              to="/notifications"
            >
              {({ isActive }) => (
                <>
                  <Bell className={isActive ? "fill-white" : ""} size={28} />
                  <span>Notifications</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
