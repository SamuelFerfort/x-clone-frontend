import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import { useAuth } from "../contexts/AuthProvider";

const useNotificationsMutation = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return authenticatedFetch("/api/user/notifications", {
        method: "POST",
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["notifications", user.id]);

      const previousNotifications = queryClient.getQueryData([
        "notifications",
        user.id,
      ]);

      if (previousNotifications) {
        queryClient.setQueryData(["notifications", user.id], {
          ...previousNotifications,
          allRead: true,
          notifications: previousNotifications.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
        });
      }

      return { previousNotifications };
    },
    onError: (err, variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications", user.id],
          context.previousNotifications
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["notifications", user.id]);
    },
  });
};

export default useNotificationsMutation;
