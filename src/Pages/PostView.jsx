import { useParams } from "react-router-dom";
import { usePostReplies } from "../hooks/usePosts";
import Spinner from "../Components/Spinner";
import useTitle from "../hooks/useTitle";
import CreatePost from "../Components/CreatePost";
import { Fragment } from "react";
import Post from "../Components/Post";
import InfiniteScrollLoader from "../Components/InfiniteScrollLoader";

export default function PostView() {
  const { postId, handler } = useParams();



  const {
    status,
    fetchNextPage,
    hasNextPage,
    data,
    isFetchingNextPage,
    error,
  } = usePostReplies(postId);

  useTitle(`${handler} post`);

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
  if (!data || !data.pages) {
    return <div>No data available</div>;
  }

  const parentPost = data.pages[0].parentPost;

  return (
    <>
      {parentPost && <Post post={parentPost} isParentPost={true} parentPostId={parentPost.id} />}
      <CreatePost parentId={parentPost.id} />

      {data.pages.map((page, i) => (
        <Fragment key={`page-${i}`}>
          {page.posts.map((post) => (
            <Post post={post} key={post.id} parentPostId={parentPost.id} />
          ))}
        </Fragment>
      ))}

      <InfiniteScrollLoader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        noPostsText={"No more replies"}
      />
    </>
  );
}
