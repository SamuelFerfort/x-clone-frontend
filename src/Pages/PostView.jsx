import { useParams, useNavigate } from "react-router-dom";
import { usePostReplies } from "../hooks/usePosts";
import Spinner from "../Components/Spinner";
import useTitle from "../hooks/useTitle";
import CreatePost from "../Components/CreatePost";
import { Fragment } from "react";
import Post from "../Components/Post";
import InfiniteScrollLoader from "../Components/InfiniteScrollLoader";
import { ArrowLeft } from "lucide-react";

export default function PostView() {
  const { postId, handler } = useParams();
  const navigate = useNavigate();

  const {
    status,
    fetchNextPage,
    hasNextPage,
    data,
    isFetchingNextPage,
    error,
  } = usePostReplies(postId);

  useTitle(`${handler} post`);

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

  const parentPost = data.pages[0].parentPost;

  return (
    <>
      <header className="pl-4 h-14 flex gap-9 items-center  fixed bg-black/40 backdrop-blur-md w-full z-10">
        <ArrowLeft
          color="white"
          className="cursor-pointer"
          size={20}
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-[21px] text-white">Post</h1>
      </header>
      <main className="mt-12">
        {parentPost && (
          <Post
            post={parentPost}
            isParentPost={true}
            parentPostId={parentPost.id}
          />
        )}

        <CreatePost
          parentId={parentPost.id}
          placeholderText={"Post your reply"}
        />

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
      </main>
    </>
  );
}
