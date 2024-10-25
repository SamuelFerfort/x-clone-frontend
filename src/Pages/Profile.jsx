import useTitle from "../hooks/useTitle";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useUserPosts } from "../hooks/usePosts";
import InfiniteScrollLoader from "../Components/InfiniteScrollLoader";
import Spinner from "../Components/Spinner";
import Post from "../Components/Post";
import AvatarIcon from "../Components/Avatar";
import { formatJoinDate } from "../utils/formatJoinDate";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import { useRef } from "react";
import EditProfileForm from "../Components/EditProfileForm";
import ToggleFollowButton from "../Components/ToggleFollowButton";
import PostSkeletonLoader from "../Components/LoadingSkeleton";

export default function Profile() {
  const [filter, setFilter] = useState({
    likes: false,
    bookmarks: false,
    media: false,
  });

  const { user } = useAuth();

  const dialogRef = useRef(null);

  const navigate = useNavigate();
  const { handler } = useParams();
  useTitle(`${handler || "No data"}'s profile`);

  const {
    status,
    fetchNextPage,
    hasNextPage,
    data,
    isFetchingNextPage,
    error,
  } = useUserPosts(handler);

  if (status === "error") {
    return (
      <div className="flex justify-center pt-20 text-white">
        Error fetching posts: {error.message}
      </div>
    );
  }
  if (status === "pending" || !data) {
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );
  }
  
  const profile = data.pages[0].user;

  let posts = data.pages.flatMap((p) => p.posts);

  let NoMorePostsMessage = `You've reached the end of ${handler}'s posts`;
  const currentUser = profile.id === user.id;

  if (filter.likes) {
    posts = posts.filter(
      (p) =>
        p.likes.length > 0 && p.likes.some((like) => like.userId === profile.id)
    );

    NoMorePostsMessage = `You've seen all the posts ${handler} has liked`;
  } else if (filter.bookmarks) {
    posts = posts.filter(
      (p) =>
        p.bookmarks.length > 0 &&
        p.bookmarks.some((bm) => bm.userId === profile.id)
    );
    NoMorePostsMessage = `You've reached the end of ${handler}'s bookmarked posts`;
  } else if (filter.media) {
    posts = posts.filter(
      (p) => p.media.length > 0 && p.authorId === profile.id
    );

    NoMorePostsMessage = `You've reached the end of ${handler}'s posts with media`;
  } else {
    posts = posts.filter((post) => {
      if (post.authorId === profile.id) return true;

      return (
        post.reposts.length > 0 &&
        post.reposts.some((r) => r.userId === profile.id)
      );
    });
  }

  return (
    <>
      <header className="pl-2 h-14 flex gap-9 items-center  fixed bg-black/40 backdrop-blur-md w-full z-10">
        <button
          type="button"
          className="cursor-pointer hover:scale-110 p-2 hover:bg-gray-hover rounded-full"
        >
          <ArrowLeft
            color="white"
            className="cursor-pointer "
            size={20}
            onClick={() => navigate(-1)}
          />
        </button>

        <div className="flex flex-col">
          <h1 className="font-bold text-[21px] text-white leading-tight">
            {profile.username}
          </h1>
          <span className="text-[13px] text-gray-secondary leading-tight">
            {data.pages[0].totalCount} posts
          </span>
        </div>
      </header>
      <dialog
        ref={dialogRef}
        className="  p-4 bg-black rounded-lg max-w-xl w-full  backdrop:bg-gray-secondary backdrop:bg-opacity-60   border-gray-600 border right-20  z-24"
      >
        {" "}
        <EditProfileForm dialogRef={dialogRef} />
      </dialog>
      <main className="mt-12">
        <section className=" bg-gray-600">
          <div className="h-56 bg-gray-700 relative">
            {profile.banner && (
              <img src={profile.banner} className="h-56 w-full object-cover" />
            )}
            <div className="absolute top-[155px] left-4 bg-black rounded-full border-4 border-black">
              {" "}
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  className="w-[125px] h-[125px] rounded-full object-cover"
                />
              ) : (
                <AvatarIcon size={120} />
              )}{" "}
            </div>
          </div>
          <section className="bg-black flex p-2 gap-7 pl-5 flex-col min-h-50  ">
            <div className="ml-auto mr-4 mt-1 h-8">
              {currentUser ? (
                <button
                  onClick={() => dialogRef.current?.showModal()}
                  className="ml-auto  bg-black px-4 font-bold text-[15px] text-white rounded-3xl py-[5px] border-gray-secondary border hover:bg-gray-hover"
                >
                  Edit profile
                </button>
              ) : (
                <ToggleFollowButton
                  isFollowing={profile.followers.length > 0}
                  user={profile}
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="leading-tight">
                <h1 className="text-[22px] font-bold ">{profile.username}</h1>
                <span className="text-[15px] text-gray-secondary flex items-center gap-1 ">
                  {profile.handler}{" "}
                  {!currentUser && profile.following.length > 0 && (
                    <span className="text-[11.5px] bg-[#202327] p-0.5 text-gray-500 rounded-sm">
                      Follows you{" "}
                    </span>
                  )}
                </span>
              </div>

              <span className="break-words">
                {profile.about ? profile.about : "No status update"}
              </span>
              <div className="flex gap-1 items-center ">
                <CalendarDays color="#71767B" size={17} />

                <span className="text-sm text-gray-secondary">
                  {" "}
                  {formatJoinDate(profile.createdAt)}{" "}
                </span>
              </div>
              <div className="flex gap-2 ">
                <span className="font-bold">
                  {profile._count.following}{" "}
                  <span className="text-sm text-gray-secondary ml-1 font-normal">
                    Following
                  </span>
                </span>
                <span className="font-bold">
                  {profile._count.followers}{" "}
                  <span className="text-sm text-gray-secondary ml-1 font-normal">
                    Followers
                  </span>
                </span>
              </div>
            </div>
          </section>
          <nav className="h-12 bg-black border-b border-white/20 grid grid-cols-4 text-center pt-2 text-[15px]">
            <button
              className={`hover:bg-gray-hover  text-gray-secondary ${
                !filter.likes &&
                !filter.bookmarks &&
                !filter.media &&
                "text-white font-bold"
              }`}
              onClick={() =>
                setFilter({ likes: false, bookmarks: false, media: false })
              }
            >
              Posts
            </button>{" "}
            <button
              className={`hover:bg-gray-hover  text-gray-secondary ${
                filter.likes && "text-white font-bold"
              }`}
              onClick={() =>
                setFilter({ likes: true, media: false, bookmarks: false })
              }
            >
              {" "}
              Likes
            </button>{" "}
            <button
              className={`hover:bg-gray-hover  text-gray-secondary ${
                filter.bookmarks && "text-white font-bold"
              }`}
              onClick={() =>
                setFilter({ likes: false, media: false, bookmarks: true })
              }
            >
              Bookmarks
            </button>
            <button
              className={`hover:bg-gray-hover  text-gray-secondary ${
                filter.media && "text-white font-bold"
              }`}
              onClick={() =>
                setFilter({ likes: false, bookmarks: false, media: true })
              }
            >
              Media
            </button>
          </nav>
        </section>

        {status === "loading" || !data ? (
          <PostSkeletonLoader />
        ) : (
          posts.map((post) => (
            <Post
              post={post}
              key={post.id}
              handler={profile.handler}
              profile={profile}
            />
          ))
        )}

        <InfiniteScrollLoader
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          noPostsText={NoMorePostsMessage}
        />
      </main>
    </>
  );
}
