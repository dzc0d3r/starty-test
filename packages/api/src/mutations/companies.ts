import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CompanyResponse,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "schemas";
import { api } from "../axios.js";
import { companyKeys } from "../queries/companies.js";

const createCompany = async (
  companyData: CreateCompanyInput,
): Promise<CompanyResponse> => {
  const { data } = await api.post("/companies", companyData);
  return data;
};

const updateCompany = async ({
  id,
  ...companyData
}: { id: string } & UpdateCompanyInput): Promise<CompanyResponse> => {
  const { data } = await api.put(`/companies/${id}`, companyData);
  return data;
};

const deleteCompany = async (id: string): Promise<void> => {
  await api.delete(`/companies/${id}`);
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      // Update the cache directly and sort by date (newest first)
      queryClient.setQueryData(
        companyKeys.all,
        (old: CompanyResponse[] | undefined) => {
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

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompany,
    onSuccess: (data) => {
      // Update the cache directly and sort by date (newest first)
      queryClient.setQueryData(
        companyKeys.all,
        (old: CompanyResponse[] | undefined) => {
          if (!old) return [data];

          // Remove the old version and add the updated one, then sort
          const filtered = old.filter((company) => company.id !== data.id);
          return [data, ...filtered].sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.createdAt || 0);
            const dateB = new Date(b.updatedAt || b.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          });
        },
      );

      // Also update the individual company query
      queryClient.setQueryData(companyKeys.detail(data.id), data);
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: (_, id) => {
      // Remove the deleted company from cache
      queryClient.setQueryData(
        companyKeys.all,
        (old: CompanyResponse[] | undefined) => {
          if (!old) return [];
          return old.filter((company) => company.id !== id);
        },
      );
    },
  });
};
