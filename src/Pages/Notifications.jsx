import Spinner from "../Components/Spinner";
import useTitle from "../hooks/useTitle";
import Notification from "../Components/Notification";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthProvider";
import { authenticatedFetch } from "../utils/authenticatedFetch";

export default function Notifications() {
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => authenticatedFetch("/api/user"),
  });

  const { user } = useAuth();

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications", user.id],
    queryFn: () => authenticatedFetch("/api/user/notifications"),
  });

  useTitle("Notifications / X");

  if (isLoading || !notifications || !users || usersLoading) {
    return (
      <div className="flex justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  if (error || usersError) {
    return (
      <div className="flex justify-center pt-20 text-white">
        Error fetching posts: {error.message}
      </div>
    );
  }

  return (
    <>
      <header className="p-4 h-14 border-b border-white/20 flex  items-center  fixed bg-black/40 backdrop-blur-md  z-10 left-[600px] w-[600px] ">
        <div className="flex flex-col w-full">
          <h1 className="font-bold text-[21px] text-white leading-tight">
            Notifications
          </h1>
        </div>
      </header>
      <main className="mt-14">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <Notification n={n} key={n.id} users={users} />
          ))
        ) : (
          <div className="text-center text-second-gray pt-10 ">
            No notifications found :({" "}
          </div>
        )}
      </main>
    </>
  );
}