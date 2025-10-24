"use client";

import { CompanyCard } from "@/components/cards";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useGetCompanies } from "api";
import * as React from "react";

export const CompanyGrid = () => {
  const { data: companies, isLoading, isError, error } = useGetCompanies();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-[220px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border-destructive/50 bg-destructive/10 flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-24 text-center">
        <h3 className="text-destructive text-xl font-semibold">
          Failed to Load Companies
        </h3>
        <p className="text-destructive/80 mt-2 text-sm">
          An error occurred: {error.message}
        </p>
      </div>
    );
  }

  // Handle the empty state
  if (!companies || companies.length === 0) {
    return (
      <div className="border-muted-foreground/30 flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-24 text-center">
        <h3 className="text-xl font-semibold">No Companies Found</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          There are currently no partner companies to display.
        </p>
      </div>
    );
  }

  // Render the grid of CompanyCards on success
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};
