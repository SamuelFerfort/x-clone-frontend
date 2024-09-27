import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import { useAuth } from "../contexts/AuthProvider";

const useLikeMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    onMutate: ({ userId, handler }) => {
      return authenticatedFetch(`/api/user/${userId}/follow`, {
        method: "POST",
      });
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userPosts", variables.handler],
      });

      // In case im in my own profile
      queryClient.invalidateQueries({
        queryKey: ["userPosts", user.handler],
      });
      
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
};

export default useLikeMutation;
