import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import { useAuth } from "../contexts/AuthProvider";

const usePostDelete = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ postId, authorId }) => {
      if (authorId !== user.id) return;

      return authenticatedFetch(`/api/post/${postId}/delete`, {
        method: "DELETE",
      });
    },
    onMutate: async ({ postId, parentPostId, handler }) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({
        queryKey: ["postReplies", parentPostId],
      });

      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.filter((p) => p.id !== postId),
          })),
        };
      });

      if (parentPostId) {
        queryClient.setQueryData(["postReplies", parentPostId], (old) => {
          if (!old) return old;

          console.log;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.filter((p) => p.id !== postId),
            })),
          };
        });
      }

      if(handler) {
        queryClient.setQueryData(["userPosts", handler], (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.filter((p) => p.id !== postId),
            })),
          };
        });
      }
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
      if (variables.handler) {
        queryClient.invalidateQueries({
          queryKey: ["userPosts", variables.handler],
        });
      }
      
    },
  });
};

export default usePostDelete;
