import { useQuery } from "@tanstack/react-query";
import { SCPIResponse } from "schemas";
import { api } from "../axios.js";

export const scpiKeys = {
  all: ["scpis"] as const,
  detail: (id: string) => [...scpiKeys.all, id] as const,
};

export const getScpis = async (): Promise<SCPIResponse[]> => {
  const { data } = await api.get("/scpis");
  return data;
};

export const getScpiById = async (id: string): Promise<SCPIResponse> => {
  const { data } = await api.get(`/scpis/${id}`);
  return data;
};

export const useGetScpis = () => {
  return useQuery({
    queryKey: scpiKeys.all,
    queryFn: getScpis,
  });
};

export const useGetScpiById = (id: string) => {
  return useQuery({
    queryKey: scpiKeys.detail(id),
    queryFn: () => getScpiById(id),
    enabled: !!id,
  });
};
