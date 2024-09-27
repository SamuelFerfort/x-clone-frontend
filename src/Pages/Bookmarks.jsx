import { usePostsFeed } from "../hooks/usePosts";
import Spinner from "../Components/Spinner";
import useTitle from "../hooks/useTitle";
import Post from "../Components/Post";
import InfiniteScrollLoader from "../Components/InfiniteScrollLoader";
import { useAuth } from "../contexts/AuthProvider";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Bookmarks() {
  const [filter, setFilter] = useState();

  const { user } = useAuth();
  const {
    status,
    fetchNextPage,
    hasNextPage,
    data,
    isFetchingNextPage,
    error,
  } = usePostsFeed();

  useTitle("Bookmarks / X");

  if (status === "loading" || !data) {
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center pt-20 text-white">
        Error fetching posts: {error.message}
      </div>
    );
  }

  let posts = data.pages.flatMap((p) =>
    p.posts.filter((po) => po.bookmarks.length > 0)
  );

  if (filter) {
    posts = posts.filter((p) =>
      p.content.toLowerCase().includes(filter.toLowerCase())
    );
  }
  console.log(posts);
  return (
    <>
      <header className="p-4 h-28 flex  items-center  fixed bg-black/40 backdrop-blur-md  z-10 left-[600px] w-[600px] ">
        <div className="flex flex-col w-full">
          <h1 className="font-bold text-[21px] text-white leading-tight">
            Bookmarks
          </h1>
          <span className="text-[13px] text-gray-secondary leading-tight">
            {user.handler}
          </span>

          <div className="w-full relative mt-4 ">
            <Search
              size={16}
              className="absolute top-3 left-3"
              color="#71767B"
            />
            <input
              type="search"
              autoComplete="off"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search Bookmarks"
              className=" w-full px-9 bg-black outline-none text-sm focus:border-btn-blue border focus:border-2 rounded-full h-10 border-gray-secondary placeholder:text-gray-secondary"
            />
          </div>
        </div>
      </header>
      <main className="mt-28">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </main>

      <InfiniteScrollLoader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        noPostsText={"No more posts"}
      />
    </>
  );
}
