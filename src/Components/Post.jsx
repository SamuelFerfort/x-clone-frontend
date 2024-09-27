import { useState } from "react";
import PropTypes from "prop-types";
import { Heart, Repeat2, Bookmark, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import AvatarIcon from "./Avatar";
import useInteractionMutation from "../hooks/useInteractionMutation";
import DeleteBtn from "./DeleteBtn";
import { useAuth } from "../contexts/AuthProvider";
import {
  formatTimeDifference,
  formatPostTimestamp,
} from "../utils/formatJoinDate";

export default function Post({
  post,
  isParentPost = false,
  parentPostId,
  handler,
}) {
  const [hover, setHover] = useState({
    repost: false,
    like: false,
    bookmark: false,
    comment: false,
    post: false,
  });
  
  const { user } = useAuth();
  const interactionMutation = useInteractionMutation();

  const handleInteraction = (e, interactionType) => {
    e.preventDefault();
    e.stopPropagation();
    interactionMutation.mutate({
      postId: post.id,
      interactionType,
      parentPostId,
      isParentPost,
      handler,
    });
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
        <MessageCircle size={18} stroke={hover.comment ? "#1A8BD6" : "gray"} />
        <span className="text-sm">{post._count.replies}</span>
      </button>
      {/* Repost button */}
      <button
        className="flex items-center gap-1 hover:text-repost-green group hover:bg-repost-hover rounded-full p-2"
        onMouseEnter={() => setHover((prev) => ({ ...prev, repost: true }))}
        onMouseLeave={() => setHover((prev) => ({ ...prev, repost: false }))}
        onClick={(e) => handleInteraction(e, "reposts")}
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
      {/* Like button */}
      <button
        className="flex items-center gap-1 hover:text-red-like hover:bg-red-like-hover rounded-full p-2 group"
        onMouseEnter={() => setHover((prev) => ({ ...prev, like: true }))}
        onMouseLeave={() => setHover((prev) => ({ ...prev, like: false }))}
        onClick={(e) => handleInteraction(e, "likes")}
      >
        <Heart
          stroke={hover.like || isLikedByUser ? "#F91880" : "gray"}
          fill={isLikedByUser ? "#F91880" : ""}
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
      {/* Bookmark button */}
      <button
        className="flex items-center gap-1 hover:text-blue-bookmark group hover:bg-blue-hover rounded-full p-2"
        onMouseEnter={() => setHover((prev) => ({ ...prev, bookmark: true }))}
        onMouseLeave={() => setHover((prev) => ({ ...prev, bookmark: false }))}
        onClick={(e) => handleInteraction(e, "bookmarks")}
      >
        <Bookmark
          stroke={hover.bookmark || isBookmarkedByUser ? "#1A8BD6" : "gray"}
          fill={isBookmarkedByUser ? "#1A8BD6" : ""}
          size={18}
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
  );

  if (isParentPost) {
    return (
      <>
        <article
          className={`flex flex-col p-4 border-b border-white/20 ${
            isRepostedByUser && ""
          }`}
        >
          {isRepostedByUser && (
            <div className="  text-[13px] pl-4 gap-2 z-12    flex items-center  ">
              <Repeat2 color="gray" size={17} className="" />{" "}
              <span className="text-gray-secondary">You reposted</span>
            </div>
          )}
          <div className="flex items-center gap-2 mb-4">
            <Link to={`/${post.author.handler}`}>
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={`${post.author.username}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <AvatarIcon size={44} />
              )}
            </Link>
            <Link to={`/${post.author.handler}`}>
              <div className="flex flex-col ">
                <span className="font-bold leading-tight hover:underline">
                  {post.author.username}
                </span>
                <span className="text-gray-500 text-sm leading-tight">
                  {post.author.handler}
                </span>
              </div>
            </Link>
            {post.author.id === user.id && (
              <DeleteBtn
                postId={post.id}
                userId={user.id}
                parentPostId={parentPostId}
                isParentPost={isParentPost}
              />
            )}
          </div>

          {renderPostContent()}
          <section className="text-sm text-gray-500 border-b border-white/20 mt-2">
            <div className="pb-3"> {formatPostTimestamp(post.createdAt)}</div>
            <span className="min-h-10 border-white/20 border-b"> </span>
          </section>

          {renderInteractionButtons()}
        </article>
      </>
    );
  }

  return (
    <Link to={`/${post.author.handler}/status/${post.id}`} className=""
    onMouseOver={() => setHover((prev) => ({ ...prev, post: true }))}
    onMouseLeave={() => setHover((prev) => ({ ...prev, post: false }))}
    
    >
      {isRepostedByUser && (
        <div
          className={`text-[13px] pl-4 gap-2 z-12 pt-1 ${
            hover.post ? "bg-post-hover" : "bg-black"
          } -mb-3 flex items-center  `}
        >
          <Repeat2 color="gray" size={17} className="" />{" "}
          <span className="text-gray-secondary">You reposted</span>
        </div>
      )}
      <article
        className="flex p-4 pb-1 border-b border-white/20 gap-2 hover:bg-post-hover "
        key={post.id}
  
      >
        <Link to={`/${post.author.handler}`}>
          <div className="min-w-10 max-h-10">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={`${post.author.username}'s avatar`}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <AvatarIcon />
            )}
          </div>
        </Link>
        <div className="flex flex-col flex-grow min-w-0">
          <span className="flex gap-1 items-center">
            <Link to={`/${post.author.handler}`} className="flex  items-center">
              <span className="font-bold truncate hover:underline">
                {post.author.username}
              </span>
              <span className="text-gray-500 truncate ml-1 text-[15px]">
                {post.author.handler}
              </span>
              <span className="text-gray-500  text-[15px] truncate ml-1">
                · {formatTimeDifference(post.createdAt)}
              </span>
            </Link>
            {post.author.id === user.id && (
              <DeleteBtn
                postId={post.id}
                userId={user.id}
                parentPostId={parentPostId}
                handler={handler}
              />
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
  parentPostId: PropTypes.string,
  handler: PropTypes.string,
};
