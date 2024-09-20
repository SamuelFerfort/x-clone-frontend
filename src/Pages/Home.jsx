import { usePostsFeed } from "../hooks/usePosts";
import Spinner from "../Components/Spinner";
import useTitle from "../hooks/useTitle";
import { Fragment } from "react";
import Post from "../Components/Post";
import CreatePost from "../Components/CreatePost";

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
        Error fetching posts {error.message}
      </div>
    );
  }
  if (!data) return <div>Loading...</div>;
  console.log(data);

  return (
    <>
      <CreatePost />

      {data.pages.map((page, i) => (
        <Fragment key={i}>
          {page.posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </Fragment>
      ))}
    </>
  );
}
