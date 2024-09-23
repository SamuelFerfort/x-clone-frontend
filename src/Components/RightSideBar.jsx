import { useQuery } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import { useState } from "react";
import { Search } from "lucide-react";
import AvatarIcon from "./Avatar";
import Spinner from "./Spinner";
import WhoToFollowList from "./WhoToFollowList";

export default function RightSidebar() {
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => authenticatedFetch("/api/user"),
  });

  if (error) {
    return <div>Error fetching users {error.message}</div>;
  }

  return (
    <aside className="w-[1200px]   bg-black border-l border-white/20 fixed left-[1200px] z-20 h-screen text-white">
      <div className=" max-w-80 relative mt-1 ml-9">
        <label htmlFor="users">
          <Search size={17} className="absolute top-4 left-3" color="#71767B" />
        </label>
        <input
          type="search"
          name="users"
          id="users"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
          className=" w-full px-9 bg-[#202327] outline-none text-base focus:border-btn-blue focus:bg-black border focus:border-2 rounded-full h-12 border-[#202327] placeholder:text-gray-secondary"
        />
      </div>

      <WhoToFollowList data={data} isLoading={isLoading}/>
    </aside>
  );
}
