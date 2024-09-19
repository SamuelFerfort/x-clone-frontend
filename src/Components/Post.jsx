import AvatarIcon from "./Avatar";

export default function Post({ post }) {
  return (
    <article
      className="flex items-center p-5 border-y border-white/20 gap-2"
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
      <div className="flex flex-col">
        <span className="flex gap-1">
          <span className="font-bold">{post.author.username}</span>
          <span className="text-gray-500">{post.author.handler}</span>
        </span>
        <span>{post.content}</span>
      </div>
    </article>
  );
}
