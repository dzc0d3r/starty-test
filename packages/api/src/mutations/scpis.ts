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
    onSuccess: (data) => {
      // Update the cache directly and sort by date (newest first)
      queryClient.setQueryData(
        scpiKeys.all,
        (old: SCPIResponse[] | undefined) => {
          if (!old) return [data];

          return [data, ...old].sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.createdAt || 0);
            const dateB = new Date(b.updatedAt || b.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          });
        },
      );
    },
  });
};

export const useUpdateScpi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateScpi,
    onSuccess: (data) => {
      // Update the cache directly and sort by date (newest first)
      queryClient.setQueryData(
        scpiKeys.all,
        (old: SCPIResponse[] | undefined) => {
          if (!old) return [data];

          // Remove the old version and add the updated one, then sort
          const filtered = old.filter((scpi) => scpi.id !== data.id);
          return [data, ...filtered].sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.createdAt || 0);
            const dateB = new Date(b.updatedAt || b.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          });
        },
      );

      // Also update the individual SCPI query
      queryClient.setQueryData(scpiKeys.detail(data.id), data);
    },
  });
};

export const useDeleteScpi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteScpi,
    onSuccess: (_, id) => {
      // Remove the deleted SCPI from cache
      queryClient.setQueryData(
        scpiKeys.all,
        (old: SCPIResponse[] | undefined) => {
          if (!old) return [];
          return old.filter((scpi) => scpi.id !== id);
        },
      );
    },
  });
};
