import { NavLink } from "react-router-dom";
import {  User, Bookmark } from "lucide-react";
import HomeSVG from "./HomeSVG";
export default function LeftSidebar() {
  return (
    <aside className="max-w-[600px] w-full bg-black  border-r border-white/20 ">
      <nav>
        <ul className="text-white flex flex-col  mt-16 ml-[350px]  text-xl space-y-8 ">
          <li className=" ">
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
          <li>
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
          <li>
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
        </ul>
      </nav>
    </aside>
  );
}
