"use client";

// <-- CRITICAL: Mark this as a Client Component
import { useGetCompanies } from "api"; // <-- Import our custom hook!

export function CompanyList(): JSX.Element {
  // Use the hook to fetch data. TanStack Query handles the rest.
  const { data: companies, isLoading, isError, error } = useGetCompanies();

  if (isLoading) {
    return <div>Loading companies...</div>;
  }

  if (isError) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div>
      <h1>Management Companies</h1>
      <ul>
        {companies?.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
}
