import { Heart, Repeat2, Bookmark, MessageCircle } from "lucide-react";

const PostSkeleton = () => {
  const SIZE = 16;
  return (
    <div className="animate-pulse border-b border-white/20 p-4">
      <div className="flex space-x-4">
        {/* Avatar skeleton */}
        <div className="h-10 w-10 rounded-full bg-gray-700" />

        <div className="flex-1 space-y-4">
          {/* Username and handle skeleton */}
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-24 rounded bg-gray-700" />
            <div className="h-2.5 w-24 rounded bg-gray-700" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-3">
            <div className="h-2 w-4/4 rounded bg-gray-700" />
            <div className="h-2 w-4/4 rounded bg-gray-700" />
            <div className="h-2 w-1/2 rounded bg-gray-700" />
          </div>

          {/* Action buttons skeleton */}
          <div className="flex justify-between ">
            <MessageCircle size={SIZE} color="gray" />
            <Repeat2 size={SIZE + 2} color="gray" />
            <Heart size={SIZE} color="gray" />
            <Bookmark size={SIZE} color="gray" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PostSkeletonLoader = () => {
  return (
    <div className="flex flex-col divide-y divide-white/20">
      {[...Array(7)].map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
};

export default PostSkeletonLoader;
