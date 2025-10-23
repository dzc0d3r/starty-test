import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "schemas";
import { api } from "../axios.js";

export const authKeys = {
  me: ["auth", "me"] as const,
};

const getMe = async (): Promise<UserResponse> => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
