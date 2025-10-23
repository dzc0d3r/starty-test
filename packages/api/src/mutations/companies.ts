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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompany,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(data.id) });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
};
