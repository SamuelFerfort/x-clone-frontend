import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../utils/authenticatedFetch";
import { useAuth } from "../contexts/AuthProvider";

const useEditUserProfile = () => {
  const queryClient = useQueryClient();
  const { user, updateUser } = useAuth();

  return useMutation({
    mutationFn: (formData) => {
      return authenticatedFetch(`/api/user/edit`, {
        method: "POST",
        body: formData,
      });
    },

    onSuccess: () => {
      updateUser();
      queryClient.invalidateQueries(["userPosts", user.handler]);
    },
  });
};

export default useEditUserProfile;
