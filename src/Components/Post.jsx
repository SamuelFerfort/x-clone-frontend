import  { useState } from "react";
import PropTypes from "prop-types";
import { Heart, Repeat2, Bookmark, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AvatarIcon from "./Avatar";
import useInteractionMutation from "../hooks/useInteractionMutation";
import DeleteBtn from "./DeleteBtn";
import { useAuth } from "../contexts/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";

export default function Post({ post, isParentPost = false, parentPostId  }) {

  const queryClient = useQueryClient()
  const [hover, setHover] = useState({
    repost: false,
    like: false,
    bookmark: false,
    comment: false,
  });


  const { user } = useAuth();
  const interactionMutation = useInteractionMutation();

  const handleInteraction = (e,interactionType) => {
    e.preventDefault();  
    e.stopPropagation(); 
    interactionMutation.mutate({ postId: post.id, interactionType, parentPostId, isParentPost });
  };

  const isLikedByUser = post.likes.length > 0;
  const isRepostedByUser = post.reposts.length > 0;
  const isBookmarkedByUser = post.bookmarks.length > 0;

  const renderPostContent = () => (
    <>
      <p className="break-words text-second-gray">{post.content}</p>
      {post.media.length > 0 && (
        <img
          src={post.media[0].url}
          alt="Post media"
          className="max-w-full h-auto rounded-2xl mt-3"
        />
      )}
    </>
  );

  const renderInteractionButtons = () => (
    <div className="flex items-center justify-between mt-2">
      {/* Comment button */}
      <button
        className="flex items-center text-gray-500 gap-1 hover:text-blue-bookmark hover:bg-blue-hover rounded-full p-2 pl-0"
        onMouseEnter={() => setHover((prev) => ({ ...prev, comment: true }))}
        onMouseLeave={() => setHover((prev) => ({ ...prev, comment: false }))}
      >
        <MessageCircle
          size={18}
          stroke={hover.comment ? "#1A8BD6" : "gray"}
        />
        <span className="text-sm">{post._count.replies}</span>
      </button>
      {/* Repost button */}
      <button
        className="flex items-center gap-1 hover:text-repost-green group hover:bg-repost-hover rounded-full p-2"
        onMouseEnter={() => setHover((prev) => ({ ...prev, repost: true }))}
        onMouseLeave={() => setHover((prev) => ({ ...prev, repost: false }))}
        onClick={(e) => handleInteraction(e,"reposts")}
      >
        <Repeat2
          stroke={hover.repost || isRepostedByUser ? "#00BA7C" : "gray"}
          size={19}
        />
        <span className={`text-sm ${isRepostedByUser ? "text-repost-green" : "text-gray-500"} group-hover:text-repost-green`}>
          {post._count.reposts}
        </span>
      </button>
      {/* Like button */}
      <button
        className="flex items-center gap-1 hover:text-red-like hover:bg-red-like-hover rounded-full p-2 group"
        onMouseEnter={() => setHover((prev) => ({ ...prev, like: true }))}
        onMouseLeave={() => setHover((prev) => ({ ...prev, like: false }))}
        onClick={(e) => handleInteraction(e,"likes")}
      >
        <Heart
          stroke={hover.like || isLikedByUser ? "#F91880" : "gray"}
          fill={isLikedByUser ? "#F91880" : ""}
          size={17}
        />
        <span className={`text-sm ${isLikedByUser ? "text-red-like" : "text-gray-500"} group-hover:text-red-like`}>
          {post._count.likes}
        </span>
      </button>
      {/* Bookmark button */}
      <button
        className="flex items-center gap-1 hover:text-blue-bookmark group hover:bg-blue-hover rounded-full p-2"
        onMouseEnter={() => setHover((prev) => ({ ...prev, bookmark: true }))}
        onMouseLeave={() => setHover((prev) => ({ ...prev, bookmark: false }))}
        onClick={(e) => handleInteraction(e,"bookmarks")}
      >
        <Bookmark
          stroke={hover.bookmark || isBookmarkedByUser ? "#1A8BD6" : "gray"}
          fill={isBookmarkedByUser ? "#1A8BD6" : ""}
          size={18}
        />
        <span className={`text-sm ${isBookmarkedByUser ? "text-blue-bookmark" : "text-gray-500"} group-hover:text-blue-bookmark`}>
          {post._count.bookmarks}
        </span>
      </button>
    </div>
  );

  if (isParentPost) {
    return (
      <article className="flex flex-col p-4 border-b border-white/20">
        <div className="flex items-center gap-2 mb-2">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={`${post.author.username}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <AvatarIcon  size={44} />
          )}
          <div className="flex flex-col ">
            <span className="font-bold">{post.author.username}</span>
            <span className="text-gray-500 text-sm ">{post.author.handler}</span>
          </div>
          {post.author.id === user.id && (
            <DeleteBtn postId={post.id} userId={user.id} />
          )}
        </div>
        {renderPostContent()}
        {renderInteractionButtons()}
      </article>
    );
  }

  return (
    <Link to={`/${post.author.handler}/status/${post.id}`}>
      <article className="flex p-4 pb-1 border-b border-white/20 gap-2 hover:bg-post-hover" key={post.id}>
        <div>
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={`${post.author.username}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <AvatarIcon />
          )}
        </div>
        <div className="flex flex-col flex-grow min-w-0">
          <span className="flex gap-1">
            <span className="font-bold truncate">{post.author.username}</span>
            <span className="text-gray-500 truncate">{post.author.handler}</span>
            {post.author.id === user.id && (
              <DeleteBtn postId={post.id} userId={user.id} />
            )}
          </span>
          {renderPostContent()}
          {renderInteractionButtons()}
        </div>
      </article>
    </Link>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  isParentPost: PropTypes.bool,
};