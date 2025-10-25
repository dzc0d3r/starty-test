export { ApiProvider } from "./provider.js";

export { useGetMeQuery, useAdminGetMeQuery } from "./queries/auth.js";
export {
  useLoginMutation,
  useLogoutMutation,
  useAdminLoginMutation,
} from "./mutations/auth.js";
export {
  useGetScpis,
  useGetScpiById,
  getScpiById,
  getScpis,
} from "./queries/scpis.js";
export {
  useCreateScpi,
  useUpdateScpi,
  useDeleteScpi,
} from "./mutations/scpis.js";

export {
  useGetCompanies,
  useGetCompanyById,
  getCompanies,
  getCompanyById,
} from "./queries/companies.js";
export {
  useCreateCompany,
  useUpdateCompany,
  useDeleteCompany,
} from "./mutations/companies.js";
export { initializeApi } from "./axios.js";
