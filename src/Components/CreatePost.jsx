import { useAuth } from "../contexts/AuthProvider";
import { useRef, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import AvatarIcon from "./Avatar";
import { Smile, ImageIcon } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const user = useAuth();
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [postContent]);

  const addEmoji = (emoji) => {
    const emojiChar = emoji.native;
    setPostContent((prevMessage) => prevMessage + emojiChar);
  };

  async function handlePostSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("content", postContent);

    mutate(formData);
  }

  const customTheme = {
    theme: "dark",
    set: "x",
    background: "#000000",
    color: "#FFFFFF",
  };

  return (
    <section className="flex  p-4 border-y border-white/20 gap-2  text-xl">
      <div className="">
        {user.avatar ? (
          <img src={user.avatar} alt={`${user.username}'s avatar`} />
        ) : (
          <AvatarIcon />
        )}
      </div>

      <form
        onSubmit={handlePostSubmit}
        className="flex  flex-col w-full relative"
      >
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
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
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

        {showEmojiPicker && (
          <div className="absolute top-full z-10">
            <Picker
              data={data}
              onEmojiSelect={addEmoji}
              theme={customTheme.theme}
              set={customTheme.set}
              emojiButtonColors={["#1D9BF0"]}
              emojiSize={20}
              perLine={8}
              previewPosition="none"
              skinTonePosition="search"
              maxFrequentRows={4}
              navPosition="bottom"
              backgroundImageFn={() => "none"}
            />
          </div>
        )}
      </form>
    </section>
  );
}
