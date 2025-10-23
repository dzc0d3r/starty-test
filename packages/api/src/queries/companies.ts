import { useQuery } from "@tanstack/react-query";
import { CompanyResponse } from "schemas";
import { api } from "../axios.js";

export const companyKeys = {
  all: ["companies"] as const,
  detail: (id: string) => [...companyKeys.all, id] as const,
};

const getCompanies = async (): Promise<CompanyResponse[]> => {
  const { data } = await api.get("/companies");
  return data;
};

const getCompanyById = async (id: string): Promise<CompanyResponse> => {
  const { data } = await api.get(`/companies/${id}`);
  return data;
};

export const useGetCompanies = () => {
  return useQuery({
    queryKey: companyKeys.all,
    queryFn: getCompanies,
  });
};

export const useGetCompanyById = (id: string) => {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: () => getCompanyById(id),
    enabled: !!id,
  });
};
