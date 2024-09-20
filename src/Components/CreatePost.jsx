import { useAuth } from "../contexts/AuthProvider";
import { useRef, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import AvatarIcon from "./Avatar";
import { Smile, ImageIcon, X } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const user = useAuth();
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: (formData) => {
      return authenticatedFetch("/api/post", {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setPostContent("");
      removeSelectedImage();
    },
    onError: (err) => {
      console.error("Failed to create post:", err);
    },
  });

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

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

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const removeSelectedImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function handlePostSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postContent);
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    createPostMutation.mutate(formData);
  }

  const customTheme = {
    theme: "dark",
    set: "x",
    background: "#000000",
    color: "#FFFFFF",
  };

  return (
    <section className="flex p-4 border-y border-white/20 gap-2 text-xl">
      <div className="">
        {user.avatar ? (
          <img src={user.avatar} alt={`${user.username}'s avatar`} />
        ) : (
          <AvatarIcon />
        )}
      </div>

      <form
        onSubmit={handlePostSubmit}
        className="flex flex-col w-full relative"
      >
        <div className="flex-grow">
          <textarea
            ref={textareaRef}
            className="w-full bg-transparent text-white resize-none outline-none text-xl mt-2 overflow-hidden"
            rows="2"
            placeholder="¡¿What's happening?!"
            value={postContent}
            disabled={createPostMutation.isLoading}
            onChange={(e) => setPostContent(e.target.value)}
          />

          {selectedImage && (
            <div className="relative mt-2 mb-4">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full h-auto rounded-2xl"
              />
              <button
                type="button"
                onClick={removeSelectedImage}
                className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile color="#1A8CD8" />
            </button>
            <label htmlFor="image-upload" className="cursor-pointer">
              <ImageIcon color="#1D9BF0" />
            </label>
            <input
              id="image-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
          </div>

          <button
            className="bg-btn-blue px-8 py-1 rounded-full text-lg font-bold hover:bg-[#1A8CD8] text-white"
            disabled={
              createPostMutation.isLoading ||
              (postContent.trim() === "" && !selectedImage)
            }
          >
            {createPostMutation.isLoading ? "Posting..." : "Post"}
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
