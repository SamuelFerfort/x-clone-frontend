import { NavLink, useLocation } from "react-router-dom";
import { User, Bookmark, Bell, LogOut, Search, X, Feather } from "lucide-react";
import { useAuth } from "../contexts/AuthProvider";
import HomeSVG from "./HomeSVG";
const SIZE = 28;
import { useState, useRef } from "react";
import CreatePostDialog from "./CreatePostDialog";



export default function MobileNav() {

  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = useRef(null);


  const location = useLocation()


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
        if (Icon === HomeSVG) {
          return (
            <Icon
              size={SIZE}
              color={isActive ? "white" : "#6b7280"}
              isActive={isActive}
            />
          );
        }
        return <Icon className={isActive ? "fill-white" : ""} size={SIZE} />;
      }}
    </NavLink>
  );

  function handleClick() {
    setShowDialog(true);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/20 flex justify-around py-3 text-white ">
      <NavIcon icon={HomeSVG} to="/home" />

      <NavIcon icon={Search} to="/explore" />
      <NavIcon icon={Bell} to="/notifications" />
      <NavIcon icon={Bookmark} to="/bookmarks" />
      <NavIcon icon={User} to={`/${user.handler}`} />
      <button onClick={logout} className="text-gray-500">
        <LogOut />
      </button>
    
  {location.pathname !== "/home" &&  <button className="bg-blue-bookmark rounded-full p-3 absolute right-2 bottom-14" onClick={handleClick}>
        <Feather />
    </button>}

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
            <CreatePostDialog ref={dialogRef} setShowDialog={setShowDialog} />
          )}
        </div>
      </dialog>
    </nav>
  );
}
