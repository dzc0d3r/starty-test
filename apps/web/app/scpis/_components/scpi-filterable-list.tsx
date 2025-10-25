"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useGetScpis } from "api";
import { Filter } from "lucide-react";
import * as React from "react";
import { SCPIResponse } from "schemas";
import { ScpiFilters, ScpiFilterState } from "./scpi-filters";
import { ScpiGrid } from "./scpi-grid";

const initialFilterState: ScpiFilterState = {
  searchQuery: "",
  types: [],
  minRate: 0,
  maxPartPrice: 5000,
  maxInvestment: 20000,
};

export const ScpiFilterableList = () => {
  const { data: allScpis, isLoading, isError, error } = useGetScpis();
  const [filters, setFilters] =
    React.useState<ScpiFilterState>(initialFilterState);

  const filteredScpis = React.useMemo(() => {
    if (!allScpis) return [];
    return allScpis.filter((scpi: SCPIResponse) => {
      const investmentMinimum =
        scpi.partPrice && scpi.subscriptionMinimum
          ? scpi.partPrice * scpi.subscriptionMinimum
          : null;
      if (scpi.partPrice && scpi.partPrice > filters.maxPartPrice) {
        return false;
      }
      if (investmentMinimum && investmentMinimum > filters.maxInvestment) {
        return false;
      }
      if (
        filters.searchQuery &&
        !scpi.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      )
        return false;
      if (filters.types.length > 0 && !filters.types.includes(scpi.type))
        return false;
      if (scpi.distributionRate && scpi.distributionRate < filters.minRate)
        return false;
      return true;
    });
  }, [allScpis, filters]);

  const availableTypes = React.useMemo(() => {
    if (!allScpis) return [];
    const types = allScpis.map((scpi) => scpi.type);
    return [...new Set(types)];
  }, [allScpis]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <Skeleton className="h-screen w-full lg:col-span-1" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-3 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center text-red-500">
        Error loading data: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
      {/* Desktop Filters */}
      <aside className="hidden h-fit lg:sticky lg:top-24 lg:col-span-1 lg:block">
        <h2 className="mb-4 text-lg font-semibold">Filters</h2>
        <ScpiFilters
          filters={filters}
          onFilterChange={setFilters}
          availableTypes={availableTypes}
        />
      </aside>

      {/* Mobile Filter Button and Drawer */}
      <div className="flex items-center justify-between px-4 lg:hidden">
        <h2 className="text-xl font-bold">
          Filter Results ({filteredScpis.length})
        </h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="px-4">
            <SheetHeader>
              <SheetTitle>Filter SCPIs</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <ScpiFilters
                filters={filters}
                onFilterChange={setFilters}
                availableTypes={availableTypes}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <section className="lg:col-span-3">
        <ScpiGrid scpis={filteredScpis} />
      </section>
    </div>
  );
};
