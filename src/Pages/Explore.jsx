import { usePostsFeed } from "../hooks/usePosts";
import Spinner from "../Components/Spinner";
import useTitle from "../hooks/useTitle";
import Post from "../Components/Post";
import InfiniteScrollLoader from "../Components/InfiniteScrollLoader";
import { Search } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ToggleFollowButton from "../Components/ToggleFollowButton";
import AvatarIcon from "../Components/Avatar";
import { authenticatedFetch } from "../utils/authenticatedFetch";

export default function Explore() {
  const [filter, setFilter] = useState();

  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => authenticatedFetch("/api/user"),
  });

  const {
    status,
    fetchNextPage,
    hasNextPage,
    data,
    isFetchingNextPage,
    error,
  } = usePostsFeed();

  useTitle("Explore / X");

  if (status === "loading" || !data || !users || isUsersLoading) {
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  if (status === "error" || usersError) {
    return (
      <div className="flex justify-center pt-20 text-white">
        Error fetching posts: {error.message}
      </div>
    );
  }
  const LIMIT = 5;
  let posts = data.pages.flatMap((p) => p.posts);
  let filteredUsers = users.slice(0, LIMIT);
  if (filter) {
    posts = posts.filter((p) =>
      p.content.toLowerCase().includes(filter.toLowerCase())
    );
    filteredUsers = users
      .filter(
        (u) =>
          u.username.toLowerCase().includes(filter.toLowerCase()) ||
          u.handler.toLowerCase().includes(filter.toLowerCase())
      )
      .slice(0, LIMIT);
  }

  return (
    <>
      <header className="p-4 h-16 flex  items-center  fixed bg-black/40 backdrop-blur-md  z-10 left-[600px] w-[600px] ">
        <div className="w-full relative  ">
          <Search size={16} className="absolute top-3 left-3" color="#71767B" />
          <input
            type="search"
            autoComplete="off"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search users or posts"
            className=" w-full px-9 bg-black outline-none text-sm focus:border-btn-blue border focus:border-2 rounded-full h-10 border-gray-secondary placeholder:text-gray-secondary"
          />
        </div>
      </header>

      <main className="mt-16 ">
        <section className="pb-3.5">
          <h1 className="text-white font-bold text-[23px] pl-4">
            {filter ? "Users" : "Who to follow"}
          </h1>
          {filteredUsers?.map((u) => (
            <Link to={`/${u.handler}`} key={u.id}>
              <li className="flex items-center justify-between px-4 py-3 hover:bg-gray-hover transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.username}
                        className="rounded-full w-10 h-10 object-cover"
                      />
                    ) : (
                      <AvatarIcon size={40} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm hover:underline">
                      {u.username}
                    </span>
                    <span className="text-gray-500 text-sm">{u.handler}</span>
                  </div>
                </div>
                <ToggleFollowButton
                  isFollowing={u.followers.length > 0}
                  user={u}
                />
              </li>
            </Link>
          ))}
        </section>
        <h1 className="text-white font-bold text-[23px] pl-4 border-t border-white/20 pt-3.5">
          Posts
        </h1>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </main>

      <InfiniteScrollLoader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        noPostsText={"No more posts bookmarked"}
      />
    </>
  );
}
