import { NavLink, Link } from "react-router-dom";
import { User, Bookmark, Bell, LogOut, X, Search } from "lucide-react";
import HomeSVG from "./HomeSVG";
import { useAuth } from "../contexts/AuthProvider";
import { useRef, useState } from "react";
import CreatePostDialog from "./CreatePostDialog";
import x from "../assets/logo.jpg";
import { useQuery } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
const SIZE = 28;

export default function LeftSidebar() {
  const dialogRef = useRef(null);
  const { logout, user } = useAuth();
  const [showDialog, setShowDialog] = useState();

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", user.id],
    queryFn: () => authenticatedFetch("/api/user/notifications"),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 30, // every 30 seconds
  });

  function handleClick() {
    setShowDialog(true);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  

  return (
    <aside className="w-[600px]  bg-black  border-r border-white/20 fixed h-screen">
      <nav className="flex">
        <ul className="text-second-gray flex flex-col  pt-2 pl-[330px]  text-xl space-y-3 flex-end">
          <li className="pl-1 ">
            <Link to="/home">
              <img src={x} className="w-auto h-11 object-cover " />
            </Link>
          </li>
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
                    size={SIZE}
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
              to="/explore"
            >
              {({ isActive }) => (
                <>
                  <Search
                    size={SIZE - 1}
                    color={"white"}
                    strokeWidth={isActive ? "2.9px" : "1.9px"}
                  />
                  <span>Explore</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="hover:bg-gray-hover p-3  rounded-full transition-colors duration-200 relative">
            <NavLink
              className={({ isActive }) =>
                `flex items-center space-x-4 ${isActive ? "font-bold" : ""}`
              }
              to="/notifications"
            >
              {({ isActive }) => (
                <>
                  <Bell className={isActive ? "fill-white" : ""} size={SIZE} />
                  <span>Notifications</span>
                  {!isLoading && !error && data?.allRead === false && (
                    <span className="w-3 h-3 rounded-full bg-blue-bookmark absolute bottom-8"></span>
                  )}
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
                    size={SIZE}
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
              to={`/${user.handler}`}
            >
              {({ isActive }) => (
                <>
                  <User className={isActive ? "fill-white" : ""} size={SIZE} />
                  <span>Profile</span>
                </>
              )}
            </NavLink>
          </li>

          <li className="hover:bg-gray-hover p-3  rounded-full transition-colors duration-200">
            <NavLink
              className={({ isActive }) =>
                `flex items-center space-x-4 ${isActive ? "font-bold" : ""}`
              }
              to="/login"
              onClick={logout}
            >
              {({ isActive }) => (
                <>
                  <LogOut
                    className={isActive ? "fill-white" : ""}
                    size={SIZE}
                  />
                  <span>Sign out</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="pt-2">
            <button
              onClick={handleClick}
              className="bg-btn-blue  py-3 rounded-full   w-full text-lg font-bold hover:bg-blue-500 text-center"
            >
              Post
            </button>

            <dialog
              ref={dialogRef}
              className="p-6 relative   pointer-events-auto  bg-black rounded-lg max-w-xl w-full h-auto max-h-[70vh] backdrop:bg-gray-secondary backdrop:bg-opacity-60  overflow-auto border-gray-600 border right-20  z-24"
            >
              <X
                className="cursor-pointer absolute top-1 left-0 p-2 rounded-full z-20 hover:bg-gray-hover"
                color="white"
                size={38}
                onClick={() => {
                  dialogRef.current?.close(), setShowDialog(false);
                }}
              />
              <div className="mt-4 border-">
                {showDialog && (
                  <CreatePostDialog
                    ref={dialogRef}
                    setShowDialog={setShowDialog}
                  />
                )}
              </div>
            </dialog>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
