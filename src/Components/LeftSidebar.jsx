import { NavLink, Link } from "react-router-dom";
import { User, Bookmark, Bell, LogOut, X, Search } from "lucide-react";
import HomeSVG from "./HomeSVG";
import { useAuth } from "../contexts/AuthProvider";
import { useRef, useState } from "react";
import CreatePostDialog from "./CreatePostDialog";
import x from "../assets/logo.jpg";

export default function LeftSidebar() {
  const dialogRef = useRef(null);
  const { logout, user } = useAuth();
  const [showDialog, setShowDialog] = useState();

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
              to="/explore"
            >
              {({ isActive }) => (
                <>
                  <Search
                    size={26}
                    color={"white"}
                    strokeWidth={isActive ? "2.9px" : "1.9px"}
                  />
                  <span>Explore</span>
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
              to={`/${user.handler}`}
            >
              {({ isActive }) => (
                <>
                  <User className={isActive ? "fill-white" : ""} size={28} />
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
                  <LogOut className={isActive ? "fill-white" : ""} size={28} />
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
