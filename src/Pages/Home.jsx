import { useEffect, useRef, useCallback } from "react";
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

  const observerTarget = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 1.0 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);
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

      <div ref={observerTarget} className="h-10">
        {isFetchingNextPage && <Spinner />}
      </div>

      {!hasNextPage && (
        <div className="text-center  text-gray-500">No more posts to load</div>
      )}
    </>
  );
}
