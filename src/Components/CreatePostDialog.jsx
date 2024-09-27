import { useAuth } from "../contexts/AuthProvider";
import { useRef, useEffect, useState, forwardRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import { Smile, ImageIcon, X } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import GifIcon from "./GifIcon";
import { useNavigate } from "react-router-dom";

const gf = new GiphyFetch("kHsEVWnq4DJWsupWneBQD5gfhPENQlrO");

const CreatePostDialog = forwardRef((props, ref) => {
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

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

      ref.current?.close();
      props.setShowDialog(false);
      setPostContent("");
      removeSelectedImage();
      setSelectedGif(null);
      setSearchTerm("");
      navigate("/home");
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

  useEffect(() => {
    if (showGifPicker) {
      searchGifs("trending");
    }
  }, [showGifPicker]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchGifs(searchTerm);
      } else if (showGifPicker) {
        searchGifs("trending");
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, showGifPicker]);

  const addEmoji = (emoji) => {
    if ((postContent + emoji.native).length > 300) return;

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
      setSelectedGif(null);
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

  const selectGif = (gif) => {
    setSelectedGif(gif);
    setShowGifPicker(false);
    setSearchTerm("");
    removeSelectedImage();
  };

  const searchGifs = async (term) => {
    try {
      const result =
        term === "trending"
          ? await gf.trending({ limit: 9 })
          : await gf.search(term, { limit: 9 });
      setGifResults(result.data);
    } catch (error) {
      console.error("Error searching GIFs:", error);
    }
  };

  async function handlePostSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData();
    formData.append("content", postContent);
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    if (selectedGif) {
      formData.append("gif", selectedGif.images.original.url);
    }

      try {
      await createPostMutation.mutateAsync(formData);
    } catch (err) {
      console.error("Error submitting post", err);
    } finally {
      setIsLoading(false);
    }
  }

  const customTheme = {
    theme: "dark",
    set: "x",
    background: "#000000",
    color: "#FFFFFF",
  };

  return (
    <div className="flex p-4 border-b border-white/20 gap-2 text-xl">
     

      <form
        onSubmit={handlePostSubmit}
        className="flex flex-col w-full relative"
      >
        <div className="flex-grow">
          <textarea
            ref={textareaRef}
            className="w-full bg-black text-white resize-none outline-none text-xl mt-2 overflow-hidden placeholder-gray-secondary"
            rows="2"
            placeholder={"What is happening?!"}
            value={postContent}
            disabled={false}
            onChange={(e) => {
              if (
                e.target.value.length <= 300 ||
                e.target.value.length < postContent.length
              ) {
                setPostContent(e.target.value);
              }
            }}
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
          {selectedGif && (
            <div className="relative mt-2 mb-4">
              <img
                src={selectedGif.images.original.url}
                alt="Selected GIF"
                className="max-w-full h-auto rounded-2xl"
              />
              <button
                type="button"
                onClick={() => setSelectedGif(null)}
                className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center ">
              <label htmlFor="image-upload" className="cursor-pointer">
                <ImageIcon color="#1D9BF0" size={20} />
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
              type="button"
              onClick={() => setShowGifPicker(!showGifPicker)}
            >
              <GifIcon size={19} />
            </button>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile color="#1A8CD8" size={19} />
            </button>
          </div>
          <div>
            {postContent.length > 0 && (
              <span className="mr-4 text-base text-btn-blue ">
                {postContent.length}/300
              </span>
            )}
            <button
              className="bg-btn-blue px-6 py-1 rounded-full text-base font-bold hover:bg-[#1A8CD8] text-white"
              disabled={
                isLoading ||
                (postContent.trim() === "" && !selectedImage && !selectedGif)
              }
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
          {createPostMutation.error && <span className="text-red-500 text-sm">{createPostMutation.error.message}</span>}
        </div>

        {showEmojiPicker && (
          <div className="absolute top-full z-10 left-16">
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
        {showGifPicker && (
          <div className="absolute top-full z-10 bg-gray-900 p-4 left-8 rounded-lg w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search GIFs"
              className="w-full p-2 rounded bg-gray-800 text-white mb-4"
            />
            <div className="grid grid-cols-3 gap-2">
              {gifResults.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.images.fixed_height_small.url}
                  alt={gif.title}
                  className="w-full h-auto cursor-pointer rounded"
                  onClick={() => selectGif(gif)}
                />
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
});
CreatePostDialog.displayName = "CreatePostDialog";

export default CreatePostDialog;
