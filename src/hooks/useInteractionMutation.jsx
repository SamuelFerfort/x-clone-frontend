import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";

const useInteractionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, interactionType }) => {
      return authenticatedFetch(`/api/post/${postId}/${interactionType}`, {
        method: "POST",
      });
    },
    onMutate: async ({ postId, interactionType, parentPostId, isParentPost }) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update posts, or if it is parentPost then update the parentPost


      /*   queryClient.setQueryData(["posts"], (old) => {
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
 */
      return { previousPosts };
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (variables.parentPostId) {
        queryClient.invalidateQueries({
          queryKey: ["postReplies", variables.parentPostId],
        });
      }
    },
  });
};

export default useInteractionMutation;
