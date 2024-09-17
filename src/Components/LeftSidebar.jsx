import { NavLink } from "react-router-dom";

export default function LeftSidebar() {
  return (
    <aside className="max-w-[600px] w-full bg-black  border-r border-white/20 ">
      <nav>
        <ul className="text-white flex flex-col  my-16 ml-96  text-xl space-y-4 ">
          <li className=" ">
            <NavLink
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              to={"/home"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              to={"/profile"}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              to={"/bookmarks"}
            >
              Bookmarks
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
