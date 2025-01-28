import { useQuery } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import WhoToFollowList from "./WhoToFollowList";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

export default function RightSidebar() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => authenticatedFetch("/api/user"),
  });

  if (error) {
    return <div>Error fetching users {error.message}</div>;
  }

  return (
    <aside className="w-[1200px]   bg-black border-l border-white/20 fixed  left-[1200px] z-20 h-screen text-white">
      <SearchBar users={data} />

      <WhoToFollowList data={data} isLoading={isLoading} />
      <Footer />
    </aside>
  );
}
