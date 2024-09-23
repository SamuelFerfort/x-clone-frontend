import { authenticatedFetch } from "./authenticatedFetch";

export const fetchPosts = async ({ pageParam = 1, userId = null }) => {
  return authenticatedFetch(
    `/api/post?page=${pageParam}&userId=${userId || ""}`
  );
};

export const fetchPostReplies = async ({ postId, pageParam = 1 }) => {
  return authenticatedFetch(`/api/post/${postId}/replies?page=${pageParam}`);
};

export const fetchUserPosts = async ({ handler, pageParam = 1 }) => {
  return authenticatedFetch(`/api/post/user/${handler}?page=${pageParam}`);
};



