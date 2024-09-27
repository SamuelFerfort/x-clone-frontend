import { useState } from "react";
import useLikeMutation from "../hooks/useLikeMutation";
import PropTypes from "prop-types";

const ToggleFollowButton = ({ isFollowing, user }) => {
  const [isHovering, setIsHovering] = useState(false);

  const likeMutation = useLikeMutation();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    likeMutation.mutate({ userId: user.id, handler: user.handler });
  };

  if (!isFollowing) {
    return (
      <button
        className="bg-white text-black font-bold text-sm rounded-full px-4 py-1.5  hover:bg-gray-200 transition-colors duration-200"
        onClick={handleClick}
      >
        Follow
      </button>
    );
  }

  return (
    <button
      className=" w-24 hover:text-red-600 hover:bg-red-950  hover:bg-opacity-20 hover:border-red-700 bg-black text-white border border-gray-secondary font-bold text-sm rounded-3xl  px-4 py-1.5  transition-colors duration-200 hover:transition-none"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      {isHovering ? "Unfollow" : "Following"}
    </button>
  );
};

ToggleFollowButton.propTypes = {
  isFollowing: PropTypes.bool,
  user: PropTypes.object,
};

export default ToggleFollowButton;
