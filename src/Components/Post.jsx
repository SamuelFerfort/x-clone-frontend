import AvatarIcon from "./Avatar";

export default function Post({ post }) {
  return (
    <article
      className="flex p-5 border-y border-white/20 gap-2 "
      key={post.id}
    >
      <div>
        {post.author.avatar ? (
          <img
            src={post.user.avatar}
            alt={`${post.author.username}'s avatar`}
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
        <p className="break-words ">{post.content}</p>

      </div>

    </article>
  );
}
