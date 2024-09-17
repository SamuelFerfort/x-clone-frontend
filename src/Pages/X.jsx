import { Outlet, useLocation, Navigate } from "react-router-dom";
import LeftSidebar from "../Components/LeftSidebar";
import { useQuery } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";



export default function X() {
  const location = useLocation();

  const {isPending, data: posts, error} = useQuery({
    queryKey: ["posts"],
    queryFn: () =>  authenticatedFetch("/api/post")
  })


  if (location.pathname === "/") {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <main className="flex h-screen border-t border-white/20">
     <LeftSidebar />
      <section className="w-[600px] bg-black text-white">
        <Outlet context={{posts, isPending, error}}/>
      </section>
      <div className="flex-grow bg-black border-l border-white/20"></div>
    </main>
  );
}
