import { usePostsFeed } from "../hooks/usePosts";
import Spinner from "../Components/Spinner";
import useTitle from "../hooks/useTitle";
import AvatarIcon from "../Components/Avatar";
import { useAuth } from "../contexts/AuthProvider";
import { Fragment, useState, useRef, useEffect } from "react";
import Post from "../Components/Post";
import { Image as ImageIcon, Smile } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";

export default function Home() {
  const { user } = useAuth();

  const {
    status,
    fetchNextPage,
    hasNextPage,
    data,
    isFetchingNextPage,
    error,
  } = usePostsFeed();

  async function handleLike(postId) {}

  const [postContent, setPostContent] = useState("");
  const textareaRef = useRef(null);

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: (formData) => {
      return authenticatedFetch("/api/post", {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }),
        setPostContent("");
    },
    onError: (err) => {
      console.error("Failed to create post:", err);
    },
  });
  const { mutate, isLoading } = createPostMutation;

  useTitle("Home / X");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [postContent]);

  if (status === "loading") {
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  async function handlePostSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("content", postContent);

    mutate(formData);
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
      <section className="flex  p-4 border-y border-white/20 gap-2  text-xl">
        <div className="">
          {user.avatar ? (
            <img src={user.avatar} alt={`${user.username}'s avatar`} />
          ) : (
            <AvatarIcon />
          )}
        </div>

        <form onSubmit={handlePostSubmit} className="flex  flex-col w-full ">
          <div className="flex-grow ">
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent text-white resize-none outline-none text-xl mt-2 overflow-hidden"
              rows="2"
              placeholder="¡¿What's happening?!"
              value={postContent}
              disabled={isLoading}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>

          <div className=" flex justify-between items-center">
            <div className="flex gap-2">
              <button type="button">
                <Smile color="#1A8CD8" />
              </button>
              <button type="button">
                <ImageIcon color="#1A8CD8" />
              </button>
            </div>
            <button
              className="bg-btn-blue px-8 py-1 rounded-full ml-auto text-lg font-bold hover:bg-blue-500"
              disabled={isLoading || postContent.trim() === ""}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </section>

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
