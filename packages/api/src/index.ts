export { ApiProvider } from "./provider.js";

export { useGetMeQuery } from "./queries/auth.js";
export { useLoginMutation, useLogoutMutation } from "./mutations/auth.js";

export { useGetScpis, useGetScpiById } from "./queries/scpis.js";
export {
  useCreateScpi,
  useUpdateScpi,
  useDeleteScpi,
} from "./mutations/scpis.js";

export { useGetCompanies, useGetCompanyById } from "./queries/companies.js";
export {
  useCreateCompany,
  useUpdateCompany,
  useDeleteCompany,
} from "./mutations/companies.js";
