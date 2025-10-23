import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateScpiInput, SCPIResponse, UpdateScpiInput } from "schemas";
import { api } from "../axios.js";
import { scpiKeys } from "../queries/scpis.js";

const createScpi = async (scpiData: CreateScpiInput): Promise<SCPIResponse> => {
  const { data } = await api.post("/scpis", scpiData);
  return data;
};

const updateScpi = async ({
  id,
  ...scpiData
}: { id: string } & UpdateScpiInput): Promise<SCPIResponse> => {
  const { data } = await api.put(`/scpis/${id}`, scpiData);
  return data;
};

const deleteScpi = async (id: string): Promise<void> => {
  await api.delete(`/scpis/${id}`);
};

export const useCreateScpi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createScpi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scpiKeys.all });
    },
  });
};

export const useUpdateScpi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateScpi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: scpiKeys.all });
      queryClient.invalidateQueries({ queryKey: scpiKeys.detail(data.id) });
    },
  });
};

export const useDeleteScpi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteScpi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scpiKeys.all });
    },
  });
};
