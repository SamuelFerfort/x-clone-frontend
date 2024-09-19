import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import { useAuth } from "../contexts/AuthProvider";

const useInteractionMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ postId, interactionType }) => {
      return authenticatedFetch(`/api/post/${postId}/${interactionType}`, {
        method: "POST",
      });
    },
    onMutate: async ({ postId, interactionType }) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.map((p) =>
              p.id === postId
                ? {
                    ...p,
                    [interactionType]: [{ userId: user.id }],
                    _count: {
                      ...p._count,
                      [interactionType]: p._count[interactionType] + 1,
                    },
                  }
                : p
            ),
          })),
        };
      });

      return { previousPosts };
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export default useInteractionMutation;
