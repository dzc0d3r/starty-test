import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginInput, LoginResponse, UserResponse } from "schemas";
import { api } from "../axios.js";
import { authKeys } from "../queries/auth.js";
import { setToken } from "../tokenStore.js";

const login = async (credentials: LoginInput): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.accessToken);

      queryClient.setQueryData<UserResponse>(authKeys.me, data.user);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setToken(null);
      queryClient.setQueryData(authKeys.me, null);
    },
  });
};
