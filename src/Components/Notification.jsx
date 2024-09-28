import AvatarIcon from "./Avatar";
import { Heart, Repeat2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Notification({ n, users }) {
  const user = users.find((u) => n.relatedUserId === u.id);

  if (!user) {
    console.error("Error finding the user for this notification");
    return;
  }

  const renderIcon = (type) => {
    if (type === "LIKE") {
      return <Heart stroke="#F91880" fill="#F91880" size={26} />;
    }
    if (type === "REPOST") {
      return <Repeat2 stroke="#00BA7C" size={28} />;
    }
    if (type === "FOLLOW") {
      return <UserPlus stroke="#1A8BD6" fill="#1A8BD6" size={28} />;
    }
    if (type === "REPLY") {
      return <Heart stroke="#F91880" fill="#F91880" size={28} />;
    }
  };

  const endpoint = (type) => {
    if (type === "LIKE" || type === "FOLLOW") return `/${user.handler}`;
    if (type === "REPOST") return `/${user.handler}/status/${n.postId}`;
  };

  return (
    <Link to={endpoint(n.type)}>
      <article className="flex flex-col border-b border-white/20 py-3 gap-2 hover:bg-post-hover">
        <div className="flex items-center pl-7 gap-2">
          {renderIcon(n.type)}
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 object-cover rounded-full"
            />
          ) : (
            <AvatarIcon size={40} />
          )}
        </div>
        <div className="pl-16 text-second-gray text-[15px]">{n.content}</div>
      </article>
    </Link>
  );
}

Notification.propTypes = {
  n: PropTypes.object,
  users: PropTypes.array,
};
