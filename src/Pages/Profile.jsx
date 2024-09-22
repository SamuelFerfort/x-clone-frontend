import useTitle from "../hooks/useTitle";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useUserPosts } from "../hooks/usePosts";
import InfiniteScrollLoader from "../Components/InfiniteScrollLoader";
import { Fragment } from "react";
import Spinner from "../Components/Spinner";
import Post from "../Components/Post";
import AvatarIcon from "../Components/Avatar";
import { formatJoinDate } from "../utils/formatJoinDate";
import { useAuth } from "../contexts/AuthProvider";

export default function Profile() {
  const navigate = useNavigate();
  const { handler } = useParams();
  useTitle(`${handler || "No data"}'s profile`);
  const { user } = useAuth();
  const {
    status,
    fetchNextPage,
    hasNextPage,
    data,
    isFetchingNextPage,
    error,
  } = useUserPosts(handler);

  if (status === "loading") {
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center pt-20 text-white">
        Error fetching posts: {error.message}
      </div>
    );
  }
  if (!data || !data.pages) {
    return (
      <div className="flex justify-center pt-20 text-white">User not found</div>
    );
  }

  const profile = data.pages[0].user;

  const currentUser = profile.id === user.id;

  return (
    <>
      <header className="pl-4 h-14 flex gap-9 items-center  fixed bg-black/40 backdrop-blur-md w-full z-10">
        <ArrowLeft
          color="white"
          className="cursor-pointer"
          size={20}
          onClick={() => navigate(-1)}
        />
        <div className="flex flex-col">
          <h1 className="font-bold text-[21px] text-white leading-tight">
            {profile.username}
          </h1>
          <span className="text-[13px] text-gray-secondary leading-tight">
            {data.pages[0].posts.length} posts
          </span>
        </div>
      </header>

      <main className="mt-12">
        <section className=" bg-gray-600">
          <div className="h-52 bg-gray-700 relative">
            <div className="absolute top-[147px] left-4">
              {" "}
              {profile.avatar ? (
                <img src={profile.avatar} className="w-[120px] h-[120px]" />
              ) : (
                <AvatarIcon size={120} />
              )}{" "}
            </div>
          </div>
          <section className="bg-black flex p-2 gap-7 pl-5 flex-col h-44  ">
            <div className="ml-auto mr-4 mt-1">
              {currentUser ? (
                <button className="ml-auto  bg-black px-4 font-bold text-[15px] text-white rounded-3xl py-[5px] border-gray-secondary border hover:bg-gray-hover">
                  Edit profile
                </button>
              ) : (
                <button className="ml-auto  bg-black px-4 font-bold text-[15px] text-white rounded-3xl py-[5px] border-gray-secondary border hover:bg-gray-hover">
                  Following
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold leading-tight">
                {profile.username}
              </h1>
              <span className="text-sm text-gray-secondary leading-tight mb">
                {profile.handler}
              </span>
              <div className="flex gap-1 items-center mt-2">
                <CalendarDays color="#71767B" size={17} />

                <span className="text-sm text-gray-secondary">
                  {" "}
                  {formatJoinDate(profile.createdAt)}{" "}
                </span>
              </div>
              <div className="flex gap-2 nt-2">
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
          <nav className="h-10 bg-black border-b border-white/20"></nav>
        </section>

        {data.pages.map((page, i) => (
          <Fragment key={`page-${i}`}>
            {page.posts.map((post) => (
              <Post post={post} key={post.id} handler={profile.handler} />
            ))}
          </Fragment>
        ))}

        <InfiniteScrollLoader
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          noPostsText={"No more user posts"}
        />
      </main>
    </>
  );
}
