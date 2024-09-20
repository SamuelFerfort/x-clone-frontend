import AvatarIcon from "./Avatar";
import { useState } from "react";
import PropTypes from "prop-types";
import { Heart, Repeat2, Bookmark, MessageCircle } from "lucide-react";
import useInteractionMutation from "../hooks/useInteractionMutation";

export default function Post({ post }) {
  const [hover, setHover] = useState({
    repost: false,
    like: false,
    bookmark: false,
    comment: false,
  });

  const interactionMutation = useInteractionMutation();

  const handleInteraction = (interactionType) => {
    interactionMutation.mutate({ postId: post.id, interactionType });
  };

  if (post.media.length > 0) {
    console.log(post);
  }

  const isLikedByUser = post.likes.length > 0;
  const isRepostedByUser = post.reposts.length > 0;
  const isBookmarkedByUser = post.bookmarks.length > 0;

  return (
    <article
      className="flex p-4 pb-1 border-y border-white/20 gap-2 "
      key={post.id}
    >
      <div>
        {post.author.avatar ? (
          <img
            src={post.user.avatar}
            alt={`${post.author.username}'s avatar`}
            className=""
          />
        ) : (
          <AvatarIcon />
        )}
      </div>
      <div className="flex flex-col flex-grow min-w-0">
        <span className="flex gap-1">
          <span className="font-bold truncate">{post.author.username}</span>
          <span className="text-gray-500 truncate">{post.author.handler}</span>
        </span>
        <p className="break-words text-second-gray">{post.content}</p>
        {post.media.length > 0 && (
          <img
            src={post.media[0].url}
            className="max-w-full h-auto rounded-2xl mt-4"
          />
        )}
        <div className="flex items-center justify-between mt-2">
          <button
            className="flex items-center text-gray-500 gap-1  hover:text-blue-bookmark hover:bg-blue-hover rounded-full p-2 pl-0"
            onMouseEnter={() =>
              setHover((prev) => ({ ...prev, comment: true }))
            }
            onMouseLeave={() =>
              setHover((prev) => ({ ...prev, comment: false }))
            }
          >
            <MessageCircle
              size={18}
              stroke={hover.comment ? "#1A8BD6" : "gray"}
            />
            <span className="text-sm">{post._count.replies}</span>
          </button>
          <button
            className="flex items-center gap-1  hover:text-repost-green group hover:bg-repost-hover rounded-full p-2 "
            onMouseEnter={() => setHover((prev) => ({ ...prev, repost: true }))}
            onMouseLeave={() =>
              setHover((prev) => ({ ...prev, repost: false }))
            }
            onClick={() => handleInteraction("reposts")}
          >
            <Repeat2
              stroke={hover.repost || isRepostedByUser ? "#00BA7C" : "gray"}
              size={19}
            />
            <span
              className={`text-sm ${
                isRepostedByUser ? "text-repost-green" : "text-gray-500"
              } group-hover:text-repost-green`}
            >
              {post._count.reposts}
            </span>
          </button>
          <button
            className="flex items-center gap-1  hover:text-red-like hover:bg-red-like-hover rounded-full p-2 group"
            onMouseEnter={() => setHover((prev) => ({ ...prev, like: true }))}
            onMouseLeave={() => setHover((prev) => ({ ...prev, like: false }))}
            onClick={() => handleInteraction("likes")}
          >
            <Heart
              stroke={hover.like || isLikedByUser ? "#F91880" : "gray"}
              fill={`${isLikedByUser ? "#F91880" : ""}`}
              size={17}
            />
            <span
              className={`text-sm ${
                isLikedByUser ? "text-red-like" : "text-gray-500"
              } group-hover:text-red-like`}
            >
              {post._count.likes}
            </span>
          </button>

          <button
            className="flex items-center  gap-1  hover:text-blue-bookmark group hover:bg-blue-hover rounded-full p-2 "
            onMouseEnter={() =>
              setHover((prev) => ({ ...prev, bookmark: true }))
            }
            onMouseLeave={() =>
              setHover((prev) => ({ ...prev, bookmark: false }))
            }
            onClick={() => handleInteraction("bookmarks")}
          >
            <Bookmark
              stroke={hover.bookmark || isBookmarkedByUser ? "#1A8BD6" : "gray"}
              color={`${isBookmarkedByUser ? "#F91880" : "gray"}`}
              size={18}
              fill={`${isBookmarkedByUser ? "#1A8BD6" : ""}`}
            />
            <span
              className={`text-sm ${
                isBookmarkedByUser ? "text-blue-bookmark" : "text-gray-500"
              } group-hover:text-blue-bookmark`}
            >
              {post._count.bookmarks}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};
