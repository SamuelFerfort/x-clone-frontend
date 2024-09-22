import { usePostsFeed } from "../hooks/usePosts";
import Spinner from "../Components/Spinner";
import useTitle from "../hooks/useTitle";
import { Fragment } from "react";
import Post from "../Components/Post";
import CreatePost from "../Components/CreatePost";
import InfiniteScrollLoader from "../Components/InfiniteScrollLoader";
export default function Home() {
  const {
    status,
    fetchNextPage,
    hasNextPage,
    data,
    isFetchingNextPage,
    error,
  } = usePostsFeed();

  useTitle("Home / X");

  if (status === "loading") {
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

  if (!data) return <div>Loading...</div>;
    
  return (
    <>
      <CreatePost />

      {data.pages.map((page, i) => (
        <Fragment key={`page-${i}`}>
          {page.posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </Fragment>
      ))}

      <InfiniteScrollLoader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        noPostsText={"No more posts to load"}
      />
    </>
  );
}
