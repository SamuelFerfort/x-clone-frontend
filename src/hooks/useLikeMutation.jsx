import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";

const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: ( {userId , handler} ) => {
      return authenticatedFetch(`/api/user/${userId}/follow`, { method: "POST" });
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userPosts", variables.handler],
      });

      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
};

export default useLikeMutation;
