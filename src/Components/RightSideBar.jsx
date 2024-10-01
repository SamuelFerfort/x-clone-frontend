import { useQuery } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import WhoToFollowList from "./WhoToFollowList";
import SearchBar from "./SearchBar";

export default function RightSidebar() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => authenticatedFetch("/api/user"),
  });

  if (error) {
    return <div>Error fetching users {error.message}</div>;
  }

  return (
    <aside className="w-[1200px]   bg-black border-l border-white/20 fixed left-[1200px] z-20 h-screen text-white">
      <SearchBar users={data} />

      <WhoToFollowList data={data} isLoading={isLoading} />
      <footer className="text-[13.5px]  text-gray-secondary text-wrap ml-9 text-center max-w-80 space-x-2 mt-1 ">
        <a href="https://github.com/SamuelFerfort" className="hover:underline">Terms of service</a>
        <a href="https://github.com/SamuelFerfort" className="hover:underline">Privacy Policy</a>
        <a href="https://github.com/SamuelFerfort" className="hover:underline  ">Cookie Policy</a>
        <a href="https://github.com/SamuelFerfort" className="hover:underline">Accessibility</a>
        <a href="https://github.com/SamuelFerfort" className="hover:underline">Ads Info</a>
      </footer>
    </aside>
  );
}
