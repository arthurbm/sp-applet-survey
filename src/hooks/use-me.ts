import { User } from "@/types/user-model";
import { sessionManager } from "@/config/session-manager";
import { getMe } from "@/services/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/query";

export const useMe = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = sessionManager.hasSession();

  const { data, isLoading } = useQuery({
    queryKey: userKeys.me(),
    queryFn: getMe,
    enabled: isAuthenticated,
  });

  return {
    user: data,
    isLoading,
    mutateUser: (user: User | Partial<User>) =>
      queryClient.setQueryData(userKeys.me(), user),
  };
};
