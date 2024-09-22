import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import usePostDelete from "../hooks/usePostDelete";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function DeleteBtn({
  postId,
  userId,
  parentPostId,
  isParentPost,
  handler,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const deleteMutation = usePostDelete();

  const navigate = useNavigate();
  function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    deleteMutation.mutate({
      postId,
      authorId: userId,
      parentPostId,
      handler
    });
    if (isParentPost) {
      navigate("/home");
    }
  }

  return (
    <div className="relative ml-auto">
      <button
        className=" p-1 rounded-full hover:bg-gray-hover"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
      >
        <MoreHorizontal
          className="text-gray-500 hover:text-gray-300"
          size={18}
        />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-lg overflow-hidden">
          <button
            className="w-full px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-gray-hover flex items-center gap-3 "
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

DeleteBtn.propTypes = {
  postId: PropTypes.string,
  userId: PropTypes.string,
  parentPostId: PropTypes.string,
  isParentPost: PropTypes.bool,
  handler: PropTypes.string
};
